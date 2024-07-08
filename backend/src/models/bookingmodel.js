import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cruiseDate: {
        type: Date,
        required: true,
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    numberOfPassengers: {
        type: Number,
        required: true,
    },
    passengerDetails: [
        {
            name: {
                type: String,
                required: true,
            },
            age: {
                type: Number,
                required: true,
            },
        },
    ],
    totalCost: {
        type: Number,
        required: true,
    },
    qrCode: {
        type: String,
        default: "",
        unique: true,
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ["Pending", "Paid", "Cancelled"],
        default: "Pending",
    },
});

export const Booking = new mongoose.model("Booking", bookingSchema, "Bookings");
