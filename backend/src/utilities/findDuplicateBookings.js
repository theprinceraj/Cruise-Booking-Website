import { Booking } from "../models/bookingmodel.js";
import { validateUserId } from "./validateUserId.js";
export const findDuplicateBookings = async (userId, cruiseDate, passengerDetails) => {
    if (!(await validateUserId(userId))) {
        throw new Error("User Id is not valid");
    }
    const bookings = await Booking.find({ userId: userId, cruiseDate: cruiseDate });
    let isDuplicate = false;
    if (bookings.length > 0) {
        for (const booking of bookings) {
            // console.log(passengerDetails, "\n\n", booking.passengerDetails);
            if (booking.passengerDetails.length === passengerDetails.length) {
                for (let i = 0; i < passengerDetails.length; i++) {
                    if (
                        booking.passengerDetails[i].name === passengerDetails[i].name &&
                        booking.passengerDetails[i].age === passengerDetails[i].age
                    ) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (isDuplicate) {
                    return bookings;
                }
            }
        }
    }
    // console.log(bookings);
    return null;
};
