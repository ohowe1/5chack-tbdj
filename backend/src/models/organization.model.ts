import mongoose from "mongoose";
import { TOrganization } from "shared/types/organization";

export const Organization = new mongoose.Schema<TOrganization>({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  users: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
    required: true,
  },
});
