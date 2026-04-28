import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const messageSchema = new Schema<Message>(
  {
    content: {
      type: String,
      required: [true, "Message content is required"],
      trim: true,
    },

    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const MessageModel =
  (mongoose.models.Message as mongoose.Model<Message>) ||
  mongoose.model<Message>("Message", messageSchema);

export default MessageModel;
