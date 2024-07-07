import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    address: {
        type: String,
        require: false,
    },
});

export const User = new mongoose.model("User", userschema, "users");
