import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = `${process.env.MONGODB_URI}/NextJSAuth`;

//! readyState
// '0': 'disconnected',
// '1': 'connected',
// '2': 'connecting',
// '3': 'disconnecting',
// '99': 'uninitialized',

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState == 1) {
      console.log("Already connected!");
      return;
    }

    console.log("String ==>", MONGODB_URI);

    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error DB Connection Failed !! =", error);
  }
};
