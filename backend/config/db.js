import mongoose from "mongoose";
import colors from 'colors';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`.bgMagenta);
  } catch (err) {
    console.err(`Error:- ${err.message}`.bgRed);
    process.exit(1);
  }
};

export default connectDB;
