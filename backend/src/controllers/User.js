import { Booking } from "../models/bookingmodel.js";
import { Profile } from "../models/profilemodel.js";
import { User } from "../models/usermodel.js";
import { sendVerificationMail } from "../utilities/sendVerificationEmail.js";
import validator from "validator";
export const signupUser = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;
        if (!username || !email || !password || !phone)
            return res.status(400).json({ message: "Invalid field values provided" });
        if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email format" });
        if (!validator.isMobilePhone(phone.toString(), "any"))
            return res.status(400).json({ message: "Invalid phone number" });

        const normalizedEmail = validator.normalizeEmail(email);

        const usernameExist = await User.findOne({ username });
        if (usernameExist) return res.status(400).json({ message: "Username already in use" });
        const userEmailExist = await User.findOne({ email: normalizedEmail });
        if (userEmailExist) return res.status(400).json({ message: "Email already in use" });
        const userPhoneExist = await User.findOne({ phone });
        if (userPhoneExist) return res.status(400).json({ message: "Phone number already in use" });

        const emailVerificationCode = Math.floor(100000 + Math.random() * 900000);
        const emailVerificationCodeExpiry = Date.now() + 605000;
        await User.create({
            username,
            email: normalizedEmail,
            password,
            phone,
            emailVerificationCode,
            emailVerificationCodeExpiry,
        });
        await sendVerificationMail(email, emailVerificationCode);
        res.status(200).json({ message: "Successfully created the user" });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Internal Error", details: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Invalid field values provided" });
        if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email format" });

        const normalizedEmail = validator.normalizeEmail(email);
        const userExist = await User.findOne({ email: normalizedEmail });
        if (!userExist) return res.status(400).json({ message: "Invalid email and/or password combination" });
        if (!userExist.isEmailVerified)
            return res.status(401).json({ message: "Please verify your email before trying to login" });

        const isPasswordValid = password == userExist.password;
        if (isPasswordValid) return res.status(200).json({ message: "Login Successful" });
        else return res.status(401).json({ message: "Invalid email and/or password combination" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error", details: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User id is invalid" });
    await User.findByIdAndDelete(userId);
    await Profile.findOneAndDelete({ userId });
    await Booking.deleteMany({ userId: userId });

    res.status(200).json({ message: "User deleted successfully" });
};

export const verifyUserEmail = async (req, res) => {
    try {
        const { userId } = req.params;
        const { oneTimeVerificationCode } = req.body;

        const user = User.findById(userId);

        if (!user) return res.status(404).json({ message: "User id is invalid" });
        if (!user.emailVerificationCode || !oneTimeVerificationCode)
            return res.status(404).json({ message: "No valid verification code found" });
        if (user.emailVerificationCode !== oneTimeVerificationCode)
            return res.status(400).json({ message: "Invalid verification code" });
        if (Date.now() > new Date(user.emailVerificationCodeExpiry))
            return res.status(400).json({ message: "Verification code expired" });
        user.isEmailVerified = true;
        user.emailVerificationCode = null;
        user.emailVerificationCodeExpiry = null;
        user.save();
        return res.status(200).json({ message: "User email verified successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error", details: error.message });
    }
};
