import jwt from "jsonwebtoken";
import { IUser } from "../models/User.model";

export interface JwtPayload {
  userId: string;
  role: string;
  tokenVersion: number;
}

export const generateAccessToken = (user: IUser): string => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
      tokenVersion: user.tokenVersion,
    },
    process.env.ACCESS_SECRET as string,
    {
      expiresIn: "15m",
    },
  );
};

export const generateRefreshToken = (user: IUser): string => {
  return jwt.sign(
    {
      userId: user._id,
      tokenVersion: user.tokenVersion,
    },
    process.env.REFRESH_SECRET as string,
    {
      expiresIn: "7d",
    },
  );
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.ACCESS_SECRET as string) as JwtPayload;
};
