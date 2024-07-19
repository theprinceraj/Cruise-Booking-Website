import express from "express";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import { initializeMongoDB } from "../src/utilities/connectors.js";
import { loginUser, signupUser, deleteUser, verifyUserEmail, logOutUser } from "../src/controllers/User.js";
import { validateSession } from "../src/middlewares/sessionAuth.js";
import { createBooking, deleteExistingBookingById, findBookingsByUserId, cancelBooking } from "../src/controllers/Booking.js";
import { createProfile, updateProfile } from "../src/controllers/Profile.js";
import { getQRCode, verifyQRCode } from "../src/controllers/QRCode.js";

configDotenv();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());

initializeMongoDB();

app.post("/api/user/login", loginUser);
app.put("/api/user/signup", signupUser);
app.post("/api/user/logout", logOutUser);

app.delete("/api/user/:userId", validateSession, deleteUser);
app.post("/api/user/verify/:userId", validateSession, verifyUserEmail);

// FIXME: Fix endpoints to work with middleware; alr fixed: login,signup,logout,createBooking,deleteBooking,findBookings

app.post("/api/bookings/:userId", validateSession, createBooking);
app.delete("/api/bookings/:userId", validateSession, deleteExistingBookingById);
app.get("/api/bookings/:userId", validateSession, findBookingsByUserId);

app.post("/api/profile/:userId", createProfile);
app.patch("/api/profile/update/:userId", updateProfile);

app.get("/api/qr/", getQRCode);
app.post("/api/qr/verify/", verifyQRCode);

app.get("/api", (req, res) => res.status(200).json({ response: "API is running." }));

app.listen(port, () => {
    console.log(`Backend server live at ${port}`);
});

export default app;
