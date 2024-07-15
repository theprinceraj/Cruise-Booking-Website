import { configDotenv } from "dotenv";
configDotenv();
import jwt from "jsonwebtoken";

const MIDDLEWARE_SECRET = process.env.MIDDLEWARE_SECRET;

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Invalid API request received" });

    try {
        const decoded = jwt.verify(token, MIDDLEWARE_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Internal Error", details: "Invalid API request received" });
    }
};
