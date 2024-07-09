import jwt from "jsonwebtoken";
import QRCode from "qrcode";
import { Booking } from "../models/bookingmodel.js";
import { configDotenv } from "dotenv";
configDotenv();
const secretKey = process.env.QR_CODE_SECRET_KEY;

export const generateQRCode = async (bookingId) => {
    const booking = await Booking.findOne({ bookingId });
    if (!booking) {
        throw new Error("Booking Id is invalid");
    }
    if (booking.paymentStatus !== "Paid") {
        throw new Error("Payment not confirmed for this booking");
    }
    const payload = { bookingId, userId: booking.userId };
    const token = jwt.sign(payload, secretKey);
    const qrCodeData = await QRCode.toDataURL(token);

    booking.qrCode = qrCodeData;
    await booking.save();

    return qrCodeData;
};
