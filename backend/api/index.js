import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
configDotenv();
import { initializeMongoDB } from "../src/utilities/connectors.js";
initializeMongoDB();
import UserRoute from "../src/routes/UserRoute.js";
import BookingRoute from "../src/routes/BookingRoute.js";
import ProfileRoute from "../src/routes/ProfileRoute.js";
import QRRoute from "../src/routes/QRRoute.js";
import "../src/utilities/checkUnverifiedUsers.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use(express.json({ limit: "2mb" }));
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api", UserRoute);
app.use("/api", BookingRoute);
app.use("/api", ProfileRoute);
app.use("/api", QRRoute);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(port, () => {
    console.log(`Backend server live at ${port}`);
});

export default app;
