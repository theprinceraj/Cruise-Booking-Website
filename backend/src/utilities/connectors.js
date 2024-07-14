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

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};
export const initializeFirebase = () => {
    try {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        console.log("Succesfully connected to Firebase");
    } catch (error) {
        console.error("Failed connection to Firebase:\t", error);
        process.exit(0);
    }
};
