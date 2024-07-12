import { User } from "../models/usermodel.js";
import { Types } from "mongoose";
/**
 * Validates the given user ID by checking if it is a valid ObjectId and if a user with that ID exists in the database.
 *
 * @param {string} userId - The ID of the user to be validated.
 * @return {Promise<boolean>} A promise that resolves to true if the user ID is valid and a user with that ID exists, otherwise false.
 * @throws {Error} If the user ID is not a valid ObjectId.
 */
export const validateUserId = async (userId) => {
    if (!Types.ObjectId.isValid(userId)) {
        console.log("Failed to validate user id:", userId);
        throw new Error("Invalid User Id");
    }
    const userExists = await User.findOne({ _id: userId });
    if (userExists) {
        return true;
    } else {
        console.log("Failed to validate user id:", userId);
        return false;
    }
};
