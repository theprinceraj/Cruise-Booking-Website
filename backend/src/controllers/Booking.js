import mongoose from "mongoose";
import { Booking } from "../models/bookingmodel.js";
import { findDuplicateBookings } from "../utilities/MongoDB/findDuplicateBookings.js";
import { validateUserId } from "../utilities/MongoDB/validateUserId.js";

const createBooking = async (req, res) => {
    try {
        const { cruiseDate, numberOfPassengers, bookingDate, passengerDetails, totalCost, paymentStatus } = req.body;
        const userId = req.userId;

        if (
            !userId ||
            !cruiseDate ||
            !bookingDate ||
            !numberOfPassengers ||
            !passengerDetails ||
            !totalCost ||
            !paymentStatus
        ) {
            return res.status(400).json({ message: "Invalid values provided" });
        }

        if (!(await validateUserId(userId))) return res.status(400).json({ message: "User Id is not valid" });

        const bookingObject = {
            userId,
            cruiseDate: cruiseDate,
            bookingDate: bookingDate,
            numberOfPassengers,
            passengerDetails,
            totalCost,
            paymentStatus,
        };
        const duplicateBooking = await findDuplicateBookings(userId, cruiseDate, passengerDetails);
        if (duplicateBooking)
            return res.status(400).json({
                message: "Duplicate booking found for the same user and cruise date with identical passenger details",
            });

        await Booking.create(bookingObject);
        res.status(200).json({ message: "New booking successfully created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error", details: error.message });
    }
};

const deleteExistingBookingById = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const userId = req.userId;

        if (!bookingId || !mongoose.Types.ObjectId.isValid(bookingId)) {
            return res.status(400).json({ message: "Invalid values provided" });
        }

        const booking = await Booking.deleteOne({ _id: bookingId, userId: userId });
        console.log(booking);
        if (booking.deletedCount === 0) return res.status(400).json({ message: "Booking not found" });
        res.status(200).json({ message: "Booking was successfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error", details: error.message });
    }
};

const findBookingsByUserId = async (req, res) => {
    try {
        const userId = req.userId;

        if (!(await validateUserId(userId))) return res.status(400).json({ message: "User Id is not valid" });

        const bookings = await Booking.find({ userId: userId });
        res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error", details: error.message });
    }
};

const cancelBooking = async (req, res) => {
    try {
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error", details: error.message });
    }
};

export { createBooking, deleteExistingBookingById, findBookingsByUserId, cancelBooking };
