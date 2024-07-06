import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));

app.use(express.json({ limit: "10mb" }));
// import { scan } from "../src/controllers/scanner.js";
// app.use("/api/scan", scan);

// import { generate } from "../src/controllers/generator.js";
// app.use("/api/generate", generate);

app.get("/api", (req, res) => {
    res.json("API is running.");
});

app.listen(port, () => {
    console.log(`Backend server live at ${port}`);
});

export default app;
