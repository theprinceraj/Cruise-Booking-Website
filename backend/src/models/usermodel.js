import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: false,
    },
});

export const User = new mongoose.model("User", userschema, "Users");