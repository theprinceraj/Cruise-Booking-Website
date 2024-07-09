import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));

app.use(express.json({ limit: "2mb" }));

import { connectDB } from "../src/utilities/db.js";
connectDB();

import { loginUser, signupUser, deleteUser } from "../src/controllers/User.js";
app.post("/api/login", loginUser);
app.post("/api/signup", signupUser);
app.delete("/api/user/:userId", deleteUser);

import { createBooking, deleteExistingBookingById, findBookingsByUserId } from "../src/controllers/Booking.js";
app.post("/api/bookings", createBooking);
app.delete("/api/bookings", deleteExistingBookingById);
app.get("/api/bookings/:userId", findBookingsByUserId);

import { createProfile } from "../src/controllers/Profile.js";
app.post("/api/profile/:userId", createProfile);

import { getQRCode } from "../src/controllers/QRCode.js";
app.get("/api/qr/:bookingId", getQRCode);

app.get("/api", (req, res) => {
    res.status(200).json({ response: "API is running." });
});

app.listen(port, () => {
    console.log(`Backend server live at ${port}`);
});

export default app;
