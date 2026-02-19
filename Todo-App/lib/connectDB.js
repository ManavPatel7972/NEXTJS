import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // console.log("mongoose Connection Object ==>", mongoose.connection);

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
    
    await mongoose.connect(process.env.DB_URL + "/Todo");
    console.log("Database Successfully Connected!");
  } catch (err) {
    console.log("Database not connected! Error ==>", err);
    process.exit(1);
  }
};
