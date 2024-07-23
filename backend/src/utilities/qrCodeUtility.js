import { configDotenv } from "dotenv";
configDotenv();
const secretKey = process.env.QR_CODE_SECRET_KEY;
import jwt from "jsonwebtoken";
import QRCode from "qrcode";
import { Booking } from "../models/bookingmodel.js";

/**
 * Generates a QR code for a given booking ID and saves it in the booking document.
 *
 * @param {string} bookingId - The ID of the booking.
 * @return {Promise<string>} The base64-encoded data URL of the generated QR code.
 * @throws {Error} If the booking ID is invalid or the payment status is not "Paid".
 */
export const generateQRCode = async (bookingId) => {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new Error("Booking Id is invalid");
    }
    if (booking.paymentStatus !== "Paid") {
        throw new Error("Payment not confirmed for this booking");
    }
    console.log(booking.userId.toString());
    const payload = { bookingId, userId: booking.userId.toString() };
    const token = jwt.sign(payload, secretKey);
    const qrCodeData = await QRCode.toDataURL(token);
    booking.qrCode = qrCodeData;
    booking.jwtString = token;
    await booking.save();

    return qrCodeData;
};
