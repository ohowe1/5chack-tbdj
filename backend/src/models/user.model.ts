import mongoose from "mongoose";
import { TUser } from "shared/types/user";

export const User = new mongoose.Schema<TUser>({
    email: { type: String, required: true },
    displayName: { type: String, required: true },
    googleId: { type: String, required: true },
});

export const Users = mongoose.model<TUser>("User", User);