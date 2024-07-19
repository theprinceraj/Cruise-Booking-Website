import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

// Hashing the password before saving the user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare passwords
userSchema.methods.comparePassword = async (candidatePassword) => {
    return await bcrypt.compare(candidatePassword, this.password);
};

export const User = new mongoose.model("User", userSchema, "Users");
