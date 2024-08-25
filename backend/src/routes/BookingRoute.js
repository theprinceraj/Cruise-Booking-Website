import express from "express";
import * as BookingController from "../controllers/Booking.js";
import { validateSession } from "../middlewares/sessionAuth.js";

const router = express.Router();

router.post("/bookings", validateSession, BookingController.createBooking);
router.delete("/bookings/:userId", validateSession, BookingController.deleteExistingBookingById);
router.get("/bookings/:userId", validateSession, BookingController.findBookingsByUserId);

export default router;
