import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URL}/E-Kart`);
        console.log("MongoDB connection successful");
    }

    catch(error) {
        console.log("MongoDB connection failed", error);
    }
}

export default connectDB;


// // MONGO_URL = "mongodb+srv://hamzaumairkhan:hamza173314?@cluster0.3h7azao.mongodb.net/"