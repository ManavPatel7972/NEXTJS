import mongoose, { Schema, Document } from "mongoose";

//IUser -> Interface User
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  role: "user" | "admin";
  tokenVersion: number;
  refreshToken?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
    },

    googleId: {
      type: String,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    tokenVersion: {
      type: Number,
      default: 0,
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
