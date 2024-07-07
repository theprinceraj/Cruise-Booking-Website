import { User } from "../models/usermodel.js";
export const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (username && email && password) {
            const userExist = await User.findOne({ email });
            if (!userExist) {
                await User.create({ username, email, password });
                res.status(200).json({ message: "Successfully created the user" });
            } else {
                res.status(400).json({ message: "User already exist" });
            }
        } else {
            res.status(400).json({ message: "Invalid field values provided" });
        }
    } catch (error) {
        console.error(error)
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
