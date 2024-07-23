import express from "express";
import * as QRCodeController from "../controllers/QRCode.js";

const router = express.Router();

router.get("/qr/:bookingId", QRCodeController.getQRCode);
router.post("/qr/verify/", QRCodeController.verifyQRCode);

export default router;
