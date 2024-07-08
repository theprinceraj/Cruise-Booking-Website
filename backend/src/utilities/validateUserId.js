import { User } from "../models/usermodel.js";
import { Types } from "mongoose";
export const validateUserId = async (userId) => {
    if (!Types.ObjectId.isValid(userId)) {
        console.log(userId);
        throw new Error("Invalid User Id");
    }
    const userExists = await User.findOne({ _id: userId });
    if (userExists) {
        return true;
    } else return false;
};
