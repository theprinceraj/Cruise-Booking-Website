import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 24 * 60 * 60,
    },
});

export const Session = mongoose.model("Session", sessionSchema, "Sessions");
