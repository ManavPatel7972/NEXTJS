import mongoose, { Schema } from "mongoose";

const sessionSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 7,
  },
});

const Session = mongoose.model("Session", sessionSchema);
export default Session;
