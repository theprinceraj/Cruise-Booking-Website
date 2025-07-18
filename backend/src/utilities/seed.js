import { configDotenv } from "dotenv";
configDotenv();
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { Booking } from "../models/bookingmodel.js";
import { User } from "../models/usermodel.js";
import { Profile } from "../models/profilemodel.js";
import { generateQRCode } from "./qrCodeUtility.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { Session } from "../models/sessionModel.js";

mongoose.connect(process.env.MONGODB_URI);

const generateFakeUser = async () => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(faker.internet.password(), salt);
    return {
        username: faker.internet.userName().toLowerCase(),
        email: validator.normalizeEmail(faker.internet.email()),
        phone: faker.phone.number(),
        password: password,
        isEmailVerified: faker.helpers.arrayElement([true, false]),
    };
};

const generateFakeProfile = (userId, phone, email) => ({
    userId,
    fullName: faker.person.fullName(),
    email: email,
    phone: phone,
    address: faker.location.streetAddress(),
    profilePicture: faker.image.avatar(),
    foodPreference: faker.helpers.arrayElement(["Veg", "Non-Veg", "Vegan"]),
});

const generateFakeBooking = (userId, fakeCount) => ({
    userId,
    cruiseDate: faker.date.future(),
    bookingDate: faker.date.recent(),
    numberOfPassengers: fakeCount,
    passengerDetails: new Array(fakeCount).fill(null).map(() => ({
        name: faker.person.fullName(),
        age: faker.number.int({ min: 1, max: 100 }),
    })),
    totalCost: faker.commerce.price(),
    paymentStatus: faker.helpers.arrayElement(["Pending", "Paid", "Cancelled"]),
});

/**
 * Seeds the database with fake data.
 *
 * @warning This function clears all existing entries in all existing collections of MongoDB before seeding.
 *
 * @return {Promise<void>} A promise that resolves when the database is seeded successfully.
 */
const seedDatabase = async () => {
    try {
        await User.deleteMany({});
        await Booking.deleteMany({});
        await Profile.deleteMany({});
        await Session.deleteMany({});

        const users = [];
        for (let i = 0; i < 50; i++) {
            const user = new User(await generateFakeUser());
            users.push(user);
            await user.save();
        }
        const profiles = [];
        for (const user of users) {
            if (Math.floor(Math.random() * 4) < 2) {
                if (user.isEmailVerified) {
                    const profile = new Profile(generateFakeProfile(user._id, user.phone, user.email));
                    profiles.push(profile);
                    await profile.save();
                }
            }
        }
        const bookings = [];
        for (const user of users) {
            if (user.isEmailVerified) {
                let i = 1,
                    randomBookingCount = Math.floor(Math.random() * 3 + 1);
                while (i <= randomBookingCount) {
                    const booking = new Booking(generateFakeBooking(user._id, faker.number.int({ min: 1, max: 10 })));
                    bookings.push(booking);
                    await booking.save();
                    if (Math.floor(Math.random() * 10) <= 8 && booking.paymentStatus === "Paid") {
                        await generateQRCode(booking._id);
                    }
                    i++;
                }
            }
        }
        console.log("Database seeded successfully!");
        mongoose.connection.close();
        process.exit(1);
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

seedDatabase();
