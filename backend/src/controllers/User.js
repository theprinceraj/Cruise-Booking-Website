import { createSession, destroySession } from "../middlewares/sessionAuth.js";
import { Booking } from "../models/bookingmodel.js";
import { Profile } from "../models/profilemodel.js";
import { User } from "../models/usermodel.js";
import { validateUserId } from "../utilities/MongoDB/validateUserId.js";
import { sendVerificationMail } from "../utilities/sendVerificationEmail.js";
import validator from "validator";
const signupUser = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;
        if (!username || !email || !password || !phone)
            return res.status(400).json({ message: "Invalid field values provided", success: false });
        if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email format", success: false });
        if (!validator.isMobilePhone(phone.toString(), "any"))
            return res.status(400).json({ message: "Invalid phone number", success: false });

        const normalizedEmail = validator.normalizeEmail(email);

        const usernameExist = await User.findOne({ username });
        if (usernameExist) return res.status(400).json({ message: "Username already in use", success: false });
        const userEmailExist = await User.findOne({ email: normalizedEmail });
        if (userEmailExist) return res.status(400).json({ message: "Email already in use", success: false });
        const userPhoneExist = await User.findOne({ phone });
        if (userPhoneExist) return res.status(400).json({ message: "Phone number already in use", success: false });

        const emailVerificationCode = Math.floor(100000 + Math.random() * 900000);
        const emailVerificationCodeExpiry = Date.now() + 24 * 60 * 60 * 1000;
        const user = new User({
            username,
            email: normalizedEmail,
            password,
            phone,
            emailVerificationCode,
            emailVerificationCodeExpiry,
        });
        await user.save();
        await Profile.create({
            userId: user._id,
            email: user.email,
            phone: user.phone,
            fullName: "Your Full Name",
            address: "India",
            profilePicture: "https://avatars.githubusercontent.com/u/54814653",
            foodPreference: "Veg",
        });
        await sendVerificationMail(email, emailVerificationCode);
        const sessionId = await createSession(user._id);
        res.cookie("sessionId", sessionId, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ message: "Successfully created the user", userId: user._id, success: true });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Internal Error", details: error.message, success: false });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Invalid field values provided" });
        if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email format" });

        const normalizedEmail = validator.normalizeEmail(email, { gmail_remove_dots: false });
        const userExist = await User.findOne({ email: normalizedEmail });
        if (!userExist) return res.status(400).json({ message: "Invalid email and/or password combination" });
        if (!userExist.isEmailVerified)
            return res.status(401).json({ message: "Please verify your email before trying to login" });

        const isPasswordValid = await userExist.comparePassword(password);
        if (isPasswordValid) {
            const sessionId = await createSession(userExist._id);
            res.cookie("sessionId", sessionId, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.cookie("userId", userExist._id, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            return res.status(200).json({ message: "Login Successful" });
        } else return res.status(401).json({ message: "Invalid email and/or password combination" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error", details: error.message });
    }
};

const logOutUser = async (req, res) => {
    try {
        const sessionId = req.cookies?.sessionId;
        if (!sessionId) return res.status(400).json({ message: "Invalid session id" });
        await destroySession(sessionId);
        res.clearCookie("sessionId");
        res.status(200).json({ message: "Logout Successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error", details: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { userId } = req.params;

    if (!(await validateUserId(userId))) return res.status(404).json({ message: "User id is invalid" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User id is invalid" });
    await User.findByIdAndDelete(userId);
    await Profile.findOneAndDelete({ userId });
    await Booking.deleteMany({ userId: userId });

    res.status(200).json({ message: "User deleted successfully" });
};

/**
 * Verifies the email of a user by checking the provided verification code against the user's stored code.
 *
 * @param {Object} req - The request object containing the userId and oneTimeVerificationCode.
 * @param {Object} res - The response object used to send the result of the verification.
 * @return {Promise<void>} - A promise that resolves when the email is successfully verified.
 *                           If the user ID is invalid, an error response with status 404 is sent.
 *                           If the user email is already verified, an error response with status 400 is sent.
 *                           If there is no valid verification code found, an error response with status 404 is sent.
 *                           If the verification code is invalid, an error response with status 400 is sent.
 *                           If the verification code has expired, an error response with status 400 is sent.
 *                           If there is an internal error, an error response with status 500 is sent.
 */
const verifyUserEmail = async (req, res) => {
    try {
        const { userId } = req.params;
        const { oneTimeVerificationCode } = req.body;

        if (!(await validateUserId(userId))) return res.status(404).json({ message: "User id is invalid" });
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User id is invalid" });
        if (user.isEmailVerified) return res.status(400).json({ message: "User email already verified" });
        if (!user.emailVerificationCode || !oneTimeVerificationCode)
            return res.status(404).json({ message: "No valid verification code found" });
        if (user.emailVerificationCode != oneTimeVerificationCode)
            return res.status(400).json({ message: "Invalid verification code", codeExpiredOrIncorrect: true });
        if (Date.now() > new Date(user.emailVerificationCodeExpiry))
            return res.status(400).json({ message: "Verification code expired", codeExpiredOrIncorrect: true });
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

export { signupUser, loginUser, logOutUser, deleteUser, verifyUserEmail };
