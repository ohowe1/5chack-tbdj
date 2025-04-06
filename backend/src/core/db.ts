import mongoose from "mongoose";
import { Logger } from "pino";

const connectDB = async (logger: Logger) => {
    try {
        // Use the MONGO_URI from the environment variables
        console.log(process.env.MONGO_URI);
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in the environment variables");
        }

        // Connect to MongoDB
        const conn = await mongoose.connect(mongoUri, {});

        logger.info(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        logger.error("Error connecting to MongoDB", error);
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectDB;