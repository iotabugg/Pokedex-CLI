import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("# MongoDB Connected.")
    } catch (error) {
        console.log("MongoDB connection failed.")
        console.log(error.message)
        process.exit(1)
    }
}

export async function disconnectDB() {
  await mongoose.connection.close();
}