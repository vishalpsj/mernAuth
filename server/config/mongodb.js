import "dotenv/config";
import mongoose from "mongoose";

const connectDb = async () => {
    mongoose.connection.on('connected', () => console.log("Database is connected."))
    await mongoose.connect(process.env.MONGODB_URI);
}

export default connectDb;