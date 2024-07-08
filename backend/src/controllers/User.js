import { Booking } from "../models/bookingmodel.js";
import { Profile } from "../models/profilemodel.js";
import { User } from "../models/usermodel.js";
export const signupUser = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;
        if (!username || !email || !password || !phone) {
            return res.status(400).json({ message: "Invalid field values provided" });
        }
        const userEmailExist = await User.findOne({ email });
        if (userEmailExist) {
            return res.status(400).json({ message: "Email already in use" });
        }
        const userPhoneExist = await User.findOne({ phone });
        if (userPhoneExist) {
            return res.status(400).json({ message: "Phone number already in use" });
        }
        await User.create({ username, email, password, phone });
        res.status(200).json({ message: "Successfully created the user" });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Internal Error" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "Invalid Login" });
        }

        const isPasswordValid = password == userExist.password;
        if (isPasswordValid) {
            res.status(200).json({ message: "Login Successful" });
        } else {
            res.status(401).json({ message: "Invalid email and password combination" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error" });
    }
};

export const deleteUser = async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User id is invalid" });
    }
    await User.findByIdAndDelete(userId);
    await Profile.findOneAndDelete({ userId });
    await Booking.deleteMany({ userId: userId });

    res.status(200).json({ message: "User deleted successfully" });
};
