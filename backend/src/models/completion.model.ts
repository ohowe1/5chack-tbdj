import { TPostCompletionRequest } from "shared/types/post";

import mongoose, { Schema } from "mongoose";

export const PostCompletionRequest = new Schema<TPostCompletionRequest>({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  requested_at: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Number,
    required: true,
    default: 0, // 0 = pending, 1 = approved, 2 = rejected
  },
  comment: {
    type: String,
    trim: true,
  },
});

export const PostCompletionRequests = mongoose.model<TPostCompletionRequest>(
  "PostCompletionRequest",
  PostCompletionRequest
);
