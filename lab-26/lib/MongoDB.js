import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    //! readyState
    // '0': 'disconnected',
    // '1': 'connected',
    // '2': 'connecting',
    // '3': 'disconnecting',
    // '99': 'uninitialized',
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected!");
      return;
    }

    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/Next_Demo`,
    );

    console.log("Database Successfully Connected!");
  } catch (error) {
    console.log("Database not connected! Error ==>", error);
    process.exit(1);
  }
};
