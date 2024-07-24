import cron from "node-cron";
import { User } from "../models/usermodel.js";

// Schedule a task to run every hour
cron.schedule("* * * * *", async () => {
    try {
        const now = Date.now();

        const usersDeleted = await User.deleteMany({
            isEmailVerified: false,
            emailVerificationCodeExpiry: { $lt: now },
        });

        console.log(`Cron Job(${new Date().toLocaleString()}): Deleted ${usersDeleted.deletedCount} unverified users.`);
    } catch (error) {
        console.error("Error occured in a cron job: ", error.message);
    }
});
