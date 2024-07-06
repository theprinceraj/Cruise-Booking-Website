const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://json_db_user:json_db_user_14@cluster0.7chotup.mongodb.net/mern_stack?retryWrites=true&w=majority&appName=Cluster0"
const URI = MONGODB_URI;


const connectDB = async ()=>{
    try {
        await mongoose.connect(URI);
        console.log("Successfully connected");
    } catch (error) {
        console.error("Failed connection");
        process.exit(0);
    }
}

module.exports = connectDB;