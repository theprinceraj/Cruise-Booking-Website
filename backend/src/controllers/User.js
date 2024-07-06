import User from "../models/usermodel";
export const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (!userExist) {
            await User.create({ username, email, password });
        }
    } catch (error) {
        res.status(404).json({ message: "ERROR" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ msg: "invalid login" });
        }

        const isPasswordValid = password == userExist.password;
        if (isPasswordValid) {
            res.status(200).json({ msg: "login successful" });
        } else {
            res.status(401).json({ msg: "invalid password" });
        }
    } catch (error) {
        res.status(500).json("Internal error");
    }
};
