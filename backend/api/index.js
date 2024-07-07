import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));

app.use(express.json({ limit: "10mb" }));

import { connectDB } from "../src/utilities/db.js";
connectDB();
import { loginUser } from "../src/controllers/User.js";
import { signupUser } from "../src/controllers/User.js";
app.use("/api/login", loginUser);
app.use("/api/signup", signupUser);

app.get("/api", (req, res) => {
    res.status(200).json({ response: "API is running." });
});

app.listen(port, () => {
    console.log(`Backend server live at ${port}`);
});

export default app;
