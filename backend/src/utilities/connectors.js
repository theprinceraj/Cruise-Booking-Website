import { configDotenv } from "dotenv";
configDotenv();

import mongoose from "mongoose";
const URI = process.env.MONGODB_URI;
export const initializeMongoDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.error("Failed connection to MongoDB:\t", error);
        process.exit(0);
    }
};