import { Types } from "mongoose";

export type TUser = {
    email: string;
    displayName: string;
    googleId: string;
    organization: Types.ObjectId;
}