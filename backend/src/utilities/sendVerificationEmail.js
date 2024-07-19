import { configDotenv } from "dotenv";
configDotenv();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_PASSWORD,
    },
});

/**
 * Sends a verification email to the specified email address with the provided OTP.
 *
 * @param {string} email - The email address to send the verification email to.
 * @param {string} otp - The one-time password to include in the email.
 * @return {Promise<void>} - A promise that resolves when the email is successfully sent.
 */
export const sendVerificationMail = async (email, otp) => {
    try {
        const info = await transporter.sendMail({
            from: '"Lenin Cruise" <lenincruisewebsite@gmail.com>',
            to: email,
            subject: "OTP Verification Code for your Lenin Cruise Account",
            text: `The OTP for your Lenin Cruise is ${otp}`,
            html: `<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Your OTP Code</title><style>body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; } .email-container { max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 5px; padding: 20px; } .email-header { background-color: #4CAF50; color: #ffffff; padding: 20px; text-align: center; border-top-left-radius: 5px; border-top-right-radius: 5px; } .email-body { padding: 20px; text-align: center; } .otp-code { font-size: 24px; font-weight: bold; color: #333333; margin: 20px 0; padding: 10px; border: 1px dashed #cccccc; display: inline-block; background-color: #f9f9f9; } .email-footer { background-color: #f4f4f4; color: #666666; padding: 10px; text-align: center; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; font-size: 12px; } .email-footer a { color: #4CAF50; text-decoration: none; }</style></head><body><div class="email-container"><div class="email-header"><h1>Your OTP Code</h1></div><div class="email-body"><p>Dear User,</p><p>Thank you for using our service. Please use the following One-Time Password (OTP) to complete your process:</p><div class="otp-code">${otp}</div><p>This OTP is valid for the next 10 minutes. Do not share this code with anyone.</p></div><div class="email-footer"><p>If you did not request this, please ignore this email or contact support.</p><p>Best Regards,<br>Lenin Cruise</p></div></div></body></html>`,
        });
        // console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
