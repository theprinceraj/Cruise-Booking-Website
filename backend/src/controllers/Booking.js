import mongoose from "mongoose";
import { Booking } from "../models/bookingmodel.js";
import { findDuplicateBookings } from "../utilities/MongoDB/findDuplicateBookings.js";
import { validateUserId } from "../utilities/MongoDB/validateUserId.js";

export const createBooking = async (req, res) => {
    try {
        const { userId, cruiseDate, numberOfPassengers, bookingDate, passengerDetails, totalCost, paymentStatus } =
            req.body;
        if (
            !userId ||
            !cruiseDate ||
            !bookingDate ||
            !numberOfPassengers ||
            !passengerDetails ||
            !totalCost ||
            !paymentStatus
        ) {
            console.log(userId, numberOfPassengers, passengerDetails, totalCost, paymentStatus);
            return res.status(400).json({ message: "Invalid values provided" });
        }

        if (!(await validateUserId(userId))) {
            return res.status(400).json({ message: "User Id is not valid" });
        }

        const bookingId = new mongoose.Types.ObjectId().toString();
        const bookingObject = {
            bookingId,
            userId,
            cruiseDate: cruiseDate,
            bookingDate: bookingDate,
            numberOfPassengers,
            passengerDetails,
            totalCost,
            paymentStatus,
        };
        const duplicateBooking = await findDuplicateBookings(userId, cruiseDate, passengerDetails);
        if (duplicateBooking) {
            return res.status(400).json({
                message: "Duplicate booking found for the same user and cruise date with identical passenger details",
            });
        }
        await Booking.create(bookingObject);
        res.status(200).json({ message: "New booking succesfully created" });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Internal Error", details: error.message });
    }
};

export const deleteExistingBookingById = async (req, res) => {
    try {
        const { bookingId } = req.body;
        if (!bookingId && !mongoose.Types.ObjectId.isValid(bookingId)) {
            console.log(bookingId);
            return res.status(400).json({ message: "Invalid values provided" });
        }
        const deletedBooking = await Booking.findById(bookingId);
        if (!deletedBooking) {
            return res.status(400).json({ message: "Booking not found" });
        }
        res.status(200).json({ message: "Booking was succesfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Internal Error" });
    }
};

export const findBookingsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!(await validateUserId(userId))) {
            return res.status(400).json({ message: "User Id is not valid" });
        }
        const bookings = await Booking.find({ userId: userId });
        res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Internal Error", details: error.message });
    }
};
