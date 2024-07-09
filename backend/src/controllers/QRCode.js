import { Booking } from "../models/bookingmodel.js";
import { generateQRCode } from "../utilities/qrCodeUtility.js";

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
