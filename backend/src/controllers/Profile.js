import { validateUserId } from "../utilities/MongoDB/validateUserId.js";
import { Profile } from "../models/profilemodel.js";
import { User } from "../models/usermodel.js";
import validator from "validator";

export const createProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { fullName, address, profilePicture, foodPreference } = req.body;
        if (!(await validateUserId(userId))) {
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

export const updateProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { fullName, email, phone, address, profilePicture, foodPreference } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "Invalid field values provided" });
        }
        if (!(await validateUserId(userId))) {
            return res.status(400).json({ message: "User Id is invalid" });
        }

        const updatedFields = {};
        if (fullName !== undefined) {
            updatedFields.fullName = validator.trim(validator.escape(fullName));
        }
        if (email !== undefined) {
            if (validator.isEmail(email)) {
                updatedFields.email = validator.normalizeEmail(email);
            } else {
                return res.status(400).json({ message: "Invalid email format" });
            }
        }
        if (phone !== undefined) {
            if (validator.isMobilePhone(phone.toString(), "any")) {
                updatedFields.phone = phone;
            } else {
                return res.status(400).json({ message: "Invalid phone number" });
            }
        }
        if (address !== undefined) {
            updatedFields.address = validator.trim(validator.escape(address));
        }
        if (profilePicture !== undefined) {
            updatedFields.profilePicture = validator.trim(profilePicture);
        }
        if (foodPreference !== undefined) {
            const validFoodPreferences = ["Veg", "Non-Veg", "Vegan"];
            if (validFoodPreferences.includes(foodPreference.trim())) {
                updatedFields.foodPreference = foodPreference;
            } else {
                return res.status(400).json({ message: "Invalid food preference" });
            }
        }

        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update" });
        }

        const oldProfile = await Profile.findOneAndUpdate(
            { userId: userId },
            { $set: updatedFields },
            { runValidators: true }
        );
        if (!oldProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.log("Error encountered:", error);
        return res.status(500).json({ message: "Internal Error", details: error.message });
    }
};
