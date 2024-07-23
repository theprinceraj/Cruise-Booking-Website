import { configDotenv } from "dotenv";
configDotenv();

import jwt from "jsonwebtoken";
import { Booking } from "../models/bookingmodel.js";
import { generateQRCode } from "../utilities/qrCodeUtility.js";
import { validateUserId } from "../utilities/MongoDB/validateUserId.js";
import { Types } from "mongoose";
import { Profile } from "../models/profilemodel.js";
const secret = process.env.QR_CODE_SECRET_KEY;

export const getQRCode = async (req, res) => {
    try {
        const { bookingId } = req.params || req.body;
        if (!bookingId || !Types.ObjectId.isValid(bookingId))
            return res.status(401).json({ message: "Fetching QR failed", details: "Booking Id is invalid" });
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(400).json({ message: "Fetching QR failed", details: "Booking not found" });

        if (booking.qrCode)
            return res.status(200).json({
                message: "Fetching QR failed",
                details: "QR Code was already generated",
                qrData: booking.qrCode,
            });

        const qrData = await generateQRCode(bookingId);
        res.status(200).json({
            message: "Fetching QR successfull",
            details: "QR Code was successfully generated",
            qrData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error", details: error.message });
    }
};

export const verifyQRCode = async (req, res) => {
    try {
        const { token } = req.body;
        const decoded = jwt.verify(token, secret);
        if (!decoded)
            return res.status(400).json({
                message: "QR verification failed",
                details: "Failed to decode QR code",
                verificationStatus: false,
            });
        const { bookingId, userId: decodedUserId } = decoded;
        if (!(await validateUserId(decodedUserId)))
            return res.status(400).json({
                message: "QR verification failed",
                details: "User Id is invalid",
                verificationStatus: false,
            });

        const profile = await Profile.findOne({ decodedUserId });
        const booking = await Booking.findOne({ _id: bookingId, userId: decodedUserId });
        if (!booking || booking.userId.toString() !== decodedUserId)
            return res.status(400).json({
                message: "QR verification failed",
                details: "Either User Id or Booking Id is invalid",
                verificationStatus: false,
            });
        if (booking.paymentStatus !== "Paid")
            return res.status(200).json({
                message: "QR verification failed",
                details: "Payment for booking is not confirmed",
                verificationStatus: false,
            });
        else
            return res.status(200).json({
                message: "Booking is verified",
                details: {
                    bookingId: booking._id,
                    fullName: profile?.fullName,
                    cruiseDate: booking.cruiseDate,
                    bookingDate: booking.bookingDate,
                    numberOfPassengers: booking.numberOfPassengers,
                    passengerDetails: booking.passengerDetails,
                    totalCost: booking.totalCost,
                    qrData: booking.qrCode,
                    paymentStatus: booking.paymentStatus,
                },
                verificationStatus: true,
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error", details: error.message });
    }
};
