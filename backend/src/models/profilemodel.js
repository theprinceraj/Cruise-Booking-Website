import mongoose from "mongoose";

const profileSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
            unique: true,
        },
        address: String,
        profilePicture: {
            type: String,
            default: "",
        },
        foodPreference: {
            type: String,
            enum: ["Veg", "Non-Veg", "Vegan"],
            default: "Veg",
        },
    },
    { timestamps: true }
);

export const Profile = new mongoose.model("Profile", profileSchema, "Profiles");
