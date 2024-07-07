export const createNewBooking = (req, res) => {
    try {
        res.status(200).json({ message: "New booking succesfully created" });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Internal Error" });
    }
};

export const deleteExistingBooking = (req, res) => {
    try {
        res.status(200).json({ message: "Booking was succesfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Internal Error" });
    }
};
