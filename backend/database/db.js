import mongoose from "mongoose";
import dns from "node:dns";

try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (err) {
    // ignore if not supported in environment
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        }).then((mongoose) => {
            console.log("MongoDB connection successful");
            return mongoose;
        }).catch((error) => {
            console.log("MongoDB connection failed", error);
            cached.promise = null;
            throw error;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

export default connectDB;