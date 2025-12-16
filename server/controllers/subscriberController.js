import { sendMail } from "../helper/sendMail.js";
import subscriberModel from "../models/subscriberModel.js";
import validator from 'validator'

const addSubscriber = async (req, res) => {
  try {
    const { email } = req.body;
    const exists = await subscriberModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "You are already a subscriber!" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }
    const subscriber = new subscriberModel({ email });
    await subscriber.save();
    const subject = "Welcome to Luxeloom – You’re In!";

    const plainText = `Hello ${email},

Thank you for subscribing to Luxeloom!

We’re thrilled to have you join our community of style lovers. As a subscriber, you'll be the first to hear about exclusive offers, new collections, and style tips.

Stay tuned for what’s next — we promise it’ll be worth it.

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

  <p style="margin-bottom: 20px;">Hello ${email},</p>

  <p style="margin-bottom: 20px;">
    Thank you for subscribing to <strong>Luxeloom</strong>!
  </p>

  <p style="margin-bottom: 20px;">
    We’re thrilled to welcome you into our community. As a subscriber, you’ll be the first to know about exclusive offers, new arrivals, and expert styling tips.
  </p>

  <div style="background-color: #f0f8f5; padding: 18px 20px; border: 1px solid #b76e79; border-radius: 8px; margin-bottom: 25px;">
    <p style="margin: 0; font-weight: bold; color: #333;">Here’s what to expect:</p>
    <ul style="margin-top: 10px; color: #555; padding-left: 20px;">
      <li>Early access to new collections</li>
      <li>Exclusive subscriber-only deals</li>
      <li>Personalized recommendations</li>
    </ul>
  </div>

  <p style="margin-bottom: 20px;">
    We can't wait to share our latest pieces and inspirations with you.
  </p>

  <p style="margin-bottom: 30px;">Thank you for joining Luxeloom!</p>

  <p style="margin-bottom: 0;">
    Warm regards,<br>
    <strong>The Luxeloom Team</strong><br>
    <a href="https://luxeloom-shop.vercel.app/" style="color: #b76e79; text-decoration: none;">luxeloom-shop.vercel.app</a>
  </p>

</div>
`;

    await sendMail(email, subject, plainText, htmlContent);

    res.json({ success: true, message: "Subscribed Successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const listSubscribers = async (req, res) => {
  try {
    const subscribers = await subscriberModel.find({})
    res.json({ success: true, subscribers })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const removeSubscriber = async (req, res) => {
  try {
    const subscriber = await subscriberModel.findByIdAndDelete(req.body.id)

    const { email } = subscriber

    const subject = "Your Luxeloom Subscription Has Been Suspended";

    const plainText = `Hello ${email},

We wanted to let you know that your subscription to Luxeloom has been suspended.

This means you’ll no longer receive updates on our latest collections, exclusive offers, or styling tips.

If this was a mistake or you change your mind, you can easily resubscribe at any time by visiting our site.

Thank you for being part of the Luxeloom community.

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

  <p style="margin-bottom: 20px;">Hello ${email},</p>

  <p style="margin-bottom: 20px;">
    We wanted to let you know that your subscription to <strong>Luxeloom</strong> has been suspended.
  </p>

  <p style="margin-bottom: 20px;">
    This means you’ll no longer receive early access to our newest collections, exclusive offers, or personalized style updates.
  </p>

  <div style="background-color: #fff4f4; padding: 18px 20px; border: 1px solid #e6b5b5; border-radius: 8px; margin-bottom: 25px;">
    <p style="margin: 0; font-weight: bold; color: #b76e79;">Want to come back?</p>
    <p style="margin-top: 10px; color: #555;">
      You can reactivate your subscription anytime by visiting our site and signing up again.
    </p>
    <a href="https://luxeloom-shop.vercel.app/" style="display: inline-block; margin-top: 12px; padding: 10px 20px; background-color: #b76e79; color: #fff; text-decoration: none; border-radius: 6px;">Resubscribe</a>
  </div>

  <p style="margin-bottom: 30px;">We truly appreciate the time you spent with us.</p>

  <p style="margin-bottom: 0;">
    Warm regards,<br>
    <strong>The Luxeloom Team</strong><br>
    <a href="https://luxeloom-shop.vercel.app/" style="color: #b76e79; text-decoration: none;">luxeloom-shop.vercel.app</a>
  </p>

</div>
`;

    await sendMail(email, subject, plainText, htmlContent);

    res.json({ success: true, message: "Subscriber Removed Successfully!" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export { addSubscriber, listSubscribers, removeSubscriber };