import mongoose from "mongoose";
import faker from "@faker-js/faker";
import { Booking } from "./models/bookingmodel.js";
import { User } from "./models/usermodel.js";
import { Profile } from "./models/profilemodel.js";

import { configDotenv } from "dotenv";
configDotenv();

mongoose.connect(process.env.MONGODB_URI);

const generateFakeUser = () => ({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    password: faker.internet.password(),
});

const generateFakeProfile = (userId) => ({
    userId,
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    address: faker.address.streetAddress(),
    profilePicture: faker.image.avatar(),
    foodPreference: faker.random.arrayElement(["Veg", "Non-Veg", "Vegan"]),
});

const generateFakeBooking = (userId) => ({
    userId,
    cruiseDate: faker.date.future(),
    bookingDate: faker.date.recent(),
    numberOfPassengers: faker.random.number({ min: 1, max: 10 }),
    passengerDetails: new Array(faker.random.number({ min: 1, max: 10 })).fill(null).map(() => ({
        name: faker.name.findName(),
        age: faker.random.number({ min: 1, max: 100 }),
    })),
    totalCost: faker.commerce.price(),
    paymentStatus: faker.random.arrayElement(["Pending", "Completed"]),
});

const seedDatabase = async () => {
    try {
        await mongoose.connection.dropDatabase();

        const users = [];
        for (let i = 0; i < 50; i++) {
            const user = new User(generateFakeUser());
            users.push(user);
            await user.save();
        }

        const profiles = [];
        for (const user of users) {
            const profile = new Profile(generateFakeProfile(user._id));
            profiles.push(profile);
            await profile.save();
        }

        const bookings = [];
        for (const user of users) {
            const booking = new Booking(generateFakeBooking(user._id));
            bookings.push(booking);
            await booking.save();
        }

        console.log("Database seeded successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

seedDatabase();
