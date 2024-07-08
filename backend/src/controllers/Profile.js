import { validateUserId } from "../utilities/validateUserId.js";
import { Profile } from "../models/profilemodel.js";
import { User } from "../models/usermodel.js";

export const createProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { fullName, address, profilePicture, foodPreference } = req.body;
        if (!(await validateUserId(userId))) {
            console.log(userId);
            return res.status(400).json({ message: "User Id is invalid" });
        }
        if (await Profile.findOne({ userId })) {
            return res.status(400).json({ message: "Profile already exists" });
        }
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: "User Id is invalid" });
        }
        await Profile.create({
            userId,
            email: user.email,
            phone: user.phone,
            fullName,
            address,
            profilePicture,
            foodPreference,
        });
        res.status(200).json({ message: "Profile successfully created" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Error", details: error.message });
    }
};
