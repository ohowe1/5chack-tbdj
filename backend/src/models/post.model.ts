import mongoose from "mongoose";
import { TPost } from "shared/types/post";

export const Post = new mongoose.Schema<TPost>(
  {
    uuid: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    bounty: { type: Number, required: true, min: 0 }, // Bounty must be non-negative
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true
    },
    status: {
      type: Number,
      required: true
    },
    created_at: { type: Date, default: Date.now }
  }
);
