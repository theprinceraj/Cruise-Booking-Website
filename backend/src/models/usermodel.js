import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
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
            type: String,
            required: true,
            unique: true,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationCode: {
            type: String,
            default: null,
        },
        emailVerificationCodeExpiry: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

export const User = new mongoose.model("User", userSchema, "Users");
