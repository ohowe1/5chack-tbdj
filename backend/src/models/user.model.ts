import mongoose from "mongoose";
import { TUser } from "shared/types/user";

export const User = new mongoose.Schema<TUser>({
    id: { type: String, required: true },
    email: { type: String, required: true },
    displayName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    googleId: { type: String, required: true },
});