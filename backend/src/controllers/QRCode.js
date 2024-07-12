import jwt from "jsonwebtoken";
import { Booking } from "../models/bookingmodel.js";
import { generateQRCode } from "../utilities/qrCodeUtility.js";
import { configDotenv } from "dotenv";
import { validateUserId } from "../utilities/validateUserId.js";
import { Profile } from "../models/profilemodel.js";
configDotenv();
const secret = process.env.QR_CODE_SECRET_KEY;

export const getQRCode = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findOne({ bookingId });
        if (!booking) {
            return res.status(400).json({ message: "Booking Id is invalid" });
        }
        if (booking.qrCode) {
            return res.status(200).json({ message: "QR Code was already generated", qrData: booking.qrCode });
        }
        const qrData = await generateQRCode(bookingId);
        res.status(200).json({ message: "QR Code was successfully generated", qrData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error", details: error.message });
    }
};

export const verifyQRCode = async (req, res) => {
    try {
        const { token } = req.body;
        const decoded = jwt.verify(token, secret);
        if (!decoded) {
            console.log(decoded);
            return res.status(400).json({ message: "Failed to decode QR code", verificationStatus: false });
        }
        const { bookingId, userId } = decoded;
        if (!(await validateUserId(userId))) {
            return res.status(400).json({ message: "User Id is invalid", verificationStatus: false });
        }
        const profile = await Profile.findOne({ userId });
        const booking = await Booking.findOne({ bookingId, userId });
        if (!booking) {
            return res.status(400).json({ message: "Booking Id is invalid", verificationStatus: false });
        }
        if (booking.userId.toString() !== userId) {
            console.log(booking.userId, userId);
            return res
                .status(400)
                .json({ message: "Either User Id or Booking Id is invalid", verificationStatus: false });
        }
        if (booking.paymentStatus !== "Paid") {
            return res.status(200).json({ message: "Payment for booking is not confirmed", verificationStatus: false });
        } else {
            return res.status(200).json({
                message: "Booking is verified",
                details: {
                    bookingId: booking.bookingId,
                    fullName: profile.fullName,
                    cruiseDate: booking.cruiseDate,
                    bookingDate: booking.bookingDate,
                    numberOfPassengers: booking.numberOfPassengers,
                    passengerDetails: booking.passengerDetails,
                    totalCost: booking.totalCost,
                    paymentStatus: booking.paymentStatus,
                },
                verificationStatus: true,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error", details: error.message });
    }
};
