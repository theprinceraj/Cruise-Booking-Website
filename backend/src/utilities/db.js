import { configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv();
const URI = process.env.MONGODB_URI;

export const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Successfully connected");
    } catch (error) {
        console.error("Failed connection:\t", error);
        process.exit(0);
    }
};
