import { sendMail } from "../helper/sendMail.js";

import messageModel from "../models/message.js";

const addMessage = async (req, res) => {
    try {
      const { name, email, phone, text } = req.body;
      const date = Date.now();
  
      // Save the message to the database
      const message = new messageModel({ name, email, phone, text, date });
      await message.save();
  
      // Email details
      const subject = "We've Received Your Message - Luxeloom";
  
      const plainText = `Hello ${name},
  
  Thank you for contacting Luxeloom!
  
  We've received your message and will get back to you within 24–48 hours.
  If you need urgent help, please call (123) 456-7890.
  
  Your submitted message:
  "${text}"
  
  Thanks again!
  
  Best regards,
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
            Thank you for reaching out to <strong>Luxeloom</strong>. We have received your message and one of our style consultants will respond within <strong>24–48 hours</strong>.
          </p>
  
          <div style="background-color: #f9f9f9; padding: 18px 20px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 25px;">
            <p style="margin: 0; font-weight: bold; color: #777;">Your Message:</p>
            <p style="margin-top: 10px; color: #555;">"${text}"</p>
          </div>
  
          <p style="margin-bottom: 20px;">
            If you require immediate assistance, please call us at 
            <a href="tel:9876543210" style="color: #b76e79; text-decoration: none;">(+91) 9876543210</a>.
          </p>
  
          <p style="margin-bottom: 30px;">We appreciate your trust in Luxeloom.</p>
  
          <p style="margin-bottom: 0;">
            Warm regards,<br>
            <strong>The Luxeloom Team</strong><br>
            <a href="https://luxeloom-shop.vercel.app/" style="color: #b76e79; text-decoration: none;">luxeloom-shop.vercel.app</a>
          </p>
  
        </div>
      `;
  
      // Send the confirmation email
      await sendMail(email, subject, plainText, htmlContent);
  
      // Respond to frontend
      res.json({ success: true, message: "Message Sent Successfully!" });
    } catch (error) {
      console.error("Error in addMessage:", error);
      res.status(500).json({ success: false, message: "Failed to send message." });
    }
  };
  

const listMessages = async (req, res) => {
    try {
        const messages = await messageModel.find({}).sort({ date: -1 });
        res.json({ success: true, messages });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const removeMessages = async (req, res) => {
    try {
        await messageModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, messages: "Message deleted successfuly." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const generateReply = async (req, res) => {
    try {
        const { id, reply } = req.body;

        const message = await messageModel.findById(id);

        if (!message) {
            return res.status(404).json({ success: false, message: "Message not found." });
        }

        if (message.status) {
            return res.status(400).json({ success: false, message: "Reply has already been sent." });
        }

        // Update message fields
        message.reply = reply;
        message.replyDate = Date.now();
        message.status = true;

        await message.save();

        // Prepare and send the email
        const { name, email, text } = message;

        const subject = "Re: Your Message to Luxeloom";

        const plainText = `Hello ${name},

Thank you for contacting Luxeloom!

Here’s our reply to your message:

"${reply}"

---
Your original message:
"${text}"

If you have any further questions, feel free to reply to this email.

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
            Thank you for reaching out to <strong>Luxeloom</strong>. Here’s our reply to your message:
          </p>

          <div style="background-color: #f9f9f9; padding: 18px 20px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 25px;">
            <p style="margin: 0; font-weight: bold; color: #777;">Your Original Message:</p>
            <p style="margin-top: 10px; color: #555;">"${text}"</p>
          </div>

          <div style="background-color: #f0f8f5; padding: 18px 20px; border: 1px solid #b76e79; border-radius: 8px; margin-bottom: 25px;">
            <p style="margin: 0; font-weight: bold; color: #333;">Our Reply:</p>
            <p style="margin-top: 10px; color: #555;">"${reply}"</p>
          </div>

          <p style="margin-bottom: 20px;">
            If you have any further questions, feel free to reply to this email. We're always happy to assist you.
          </p>

          <p style="margin-bottom: 30px;">Thank you for choosing Luxeloom!</p>

          <p style="margin-bottom: 0;">
            Warm regards,<br>
            <strong>The Luxeloom Team</strong><br>
            <a href="https://luxeloom-shop.vercel.app/" style="color: #b76e79; text-decoration: none;">luxeloom-shop.vercel.app</a>
          </p>

        </div>
        `;

        await sendMail(email, subject, plainText, htmlContent);

        res.json({ success: true, message: "Reply sent and message updated successfully.", data: message });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { addMessage, listMessages, removeMessages, generateReply };
