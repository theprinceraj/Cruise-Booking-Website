import { validateUserId } from "../utilities/validateUserId.js";

export const createProfile = async (req, res) => {
    try {
        if (!(await validateUserId(userId))) {
            console.log(userId);
            return res.status(400).json({ message: "User Id is invalid" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Error", details: error.message });
    }
};
