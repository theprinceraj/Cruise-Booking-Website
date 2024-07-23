import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import { initializeMongoDB } from "../src/utilities/connectors.js";
import UserRoute from "../src/routes/UserRoute.js";
import BookingRoute from "../src/routes/BookingRoute.js";
import ProfileRoute from "../src/routes/ProfileRoute.js";
import QRRoute from "../src/routes/QRRoute.js";

configDotenv();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(express.json({ limit: "2mb" }));
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

initializeMongoDB();

// FIXME: Fix endpoints to work with middleware; alr fixed: login,signup,logout,createBooking,deleteBooking,findBookings
app.post("/api", UserRoute);
app.use("/api", BookingRoute);
app.use("/api", ProfileRoute);
app.use("/api", QRRoute);

// app.get("/api", (req, res) => res.status(200).json({ response: "API is running." }));

app.listen(port, () => {
    console.log(`Backend server live at ${port}`);
});

export default app;
