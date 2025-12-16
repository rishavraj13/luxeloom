import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { sendMail } from "../helper/sendMail.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist." })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exist" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }
        //hashing password 
        const salt = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        const subject = "Welcome to Luxeloom – Your Account Is Ready!";

        const plainText = `Hello ${name},

Welcome to Luxeloom – we're excited to have you onboard!

Your account has been successfully created, giving you access to exclusive deals, early product launches, and personalized style picks tailored just for you.

Here’s what you can look forward to:
- Early access to our latest collections
- Member-only discounts and promotions
- Curated recommendations to match your style

Log in anytime to explore your dashboard, manage preferences, and shop your favorites.

Warm regards,  
Luxeloom Support Team  
https://luxeloom-shop.vercel.app
`;

        const htmlContent = `
<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px 25px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; color: #555; border: 1px solid #e0e0e0; border-radius: 12px;">

  <div style="text-align: center; margin-bottom: 30px;">
    <a href="https://luxeloom-shop.vercel.app/" style="text-decoration: none;">
      <h1 style="font-size: 28px; color: #b76e79; margin: 0;">Luxeloom</h1>
    </a>
    <p style="color: #aaa; font-size: 14px; margin-top: 6px;">Luxury Redefined</p>
  </div>

  <p style="margin-bottom: 20px;">Hello ${name},</p>

  <p style="margin-bottom: 20px;">
    Welcome to <strong>Luxeloom</strong>! Your account has been successfully created.
  </p>

  <p style="margin-bottom: 20px;">
    We’re excited to have you join our fashion-forward community. With your new account, you now have access to:
  </p>

  <div style="background-color: #f0f8f5; padding: 18px 20px; border: 1px solid #b76e79; border-radius: 8px; margin-bottom: 25px;">
    <p style="margin: 0; font-weight: bold; color: #333;">Your account benefits:</p>
    <ul style="margin-top: 10px; color: #555; padding-left: 20px;">
      <li>Early access to new collections</li>
      <li>Exclusive member-only discounts</li>
      <li>Tailored product recommendations</li>
    </ul>
  </div>

  <p style="margin-bottom: 20px;">
    Start exploring today and make the most of your personalized Luxeloom experience.
  </p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://luxeloom-shop.vercel.app/" style="background-color: #b76e79; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Visit Your Account</a>
  </div>

  <p style="margin-bottom: 0;">
    Warm regards,<br>
    <strong>The Luxeloom Team</strong><br>
    <a href="https://luxeloom-shop.vercel.app/" style="color: #b76e79; text-decoration: none;">luxeloom-shop.vercel.app</a>
  </p>

</div>
`;

        await sendMail(email, subject, plainText, htmlContent);


        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const listUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.json({ success: true, users })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const removeUser = async (req, res) => {
    try {
        // Get user data first before deleting
        const user = await userModel.findById(req.body.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const { name, email } = user; // destructure needed fields

        // Delete the user
        await userModel.findByIdAndDelete(req.body.id);

        const subject = "Important Notice – Your Luxeloom Account Has Been Suspended";

        const plainText = `Hello ${name},

We regret to inform you that your Luxeloom account has been temporarily suspended.

This action may have been taken due to unusual activity, a violation of our terms of service, or another account-related issue. We understand this may be concerning, and we’re here to help resolve it as quickly as possible.

If you believe this suspension is in error or would like more information, please contact our support team.

Next Steps:
- Reach out to support for further assistance
- Review our terms and policies
- Await confirmation once your account is reviewed

We appreciate your understanding.

Sincerely,  
Luxeloom Support Team  
https://luxeloom-shop.vercel.app/support
`;

        const htmlContent = `
<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px 25px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; color: #555; border: 1px solid #e0e0e0; border-radius: 12px;">

  <div style="text-align: center; margin-bottom: 30px;">
    <a href="https://luxeloom-shop.vercel.app/" style="text-decoration: none;">
      <h1 style="font-size: 28px; color: #b76e79; margin: 0;">Luxeloom</h1>
    </a>
    <p style="color: #aaa; font-size: 14px; margin-top: 6px;">Luxury Redefined</p>
  </div>

  <p style="margin-bottom: 20px;">Hello ${name},</p>

  <p style="margin-bottom: 20px; color: #c0392b;"><strong>Important Notice:</strong> Your Luxeloom account has been temporarily suspended.</p>

  <p style="margin-bottom: 20px;">
    This may be due to unusual activity or a potential violation of our policies. We understand the inconvenience this may cause and are here to support you through the resolution process.
  </p>

  <div style="background-color: #fff3f3; padding: 18px 20px; border: 1px solid #e74c3c; border-radius: 8px; margin-bottom: 25px;">
    <p style="margin: 0; font-weight: bold; color: #e74c3c;">What you can do:</p>
    <ul style="margin-top: 10px; color: #555; padding-left: 20px;">
      <li>Contact our support team for assistance</li>
      <li>Review our <a href="https://luxeloom-shop.vercel.app/terms" style="color: #b76e79;">terms of service</a></li>
      <li>Await a status update after review</li>
    </ul>
  </div>

  <p style="margin-bottom: 20px;">
    If you believe this was done in error or have any questions, please don’t hesitate to get in touch.
  </p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://luxeloom-shop.vercel.app/support" style="background-color: #b76e79; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Contact Support</a>
  </div>

  <p style="margin-bottom: 0;">
    Sincerely,<br>
    <strong>The Luxeloom Support Team</strong><br>
    <a href="https://luxeloom-shop.vercel.app/" style="color: #b76e79; text-decoration: none;">luxeloom-shop.vercel.app</a>
  </p>

</div>
`;

        await sendMail(email, subject, plainText, htmlContent);

        res.json({ success: true, message: "User Removed Successfully!" });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export {
    loginUser,
    registerUser,
    adminLogin,
    listUsers,
    removeUser,
};