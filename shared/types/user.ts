import { Types } from "mongoose";

export type TUser = {
    _id: Types.ObjectId;
    email: string;
    displayName: string;
    googleId: string;
    organization: Types.ObjectId;
}