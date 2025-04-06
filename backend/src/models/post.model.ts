import mongoose from "mongoose";
import { TPostBacker, TPost } from "shared/types/post";

export const PostBacker = new mongoose.Schema<TPostBacker>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: { type: Number, required: true, min: 0 },
  back_date: { type: Date, default: Date.now },
  status: { type: Number, required: true, default: 0 },
  order_id: {
    type: String,
    required: false, // Optional, can be set after payment is confirmed}
  }
});

export const Post = new mongoose.Schema<TPost>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    backers: {
      type: [PostBacker],
      default: [],
    },
    total_backed: {
      type: Number,
      default: 0,
      min: 0,
    }, // Total amount backed, calculated from backers
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    created_at: { type: Date, default: Date.now },
  },
  {
    methods: {
      getBackerTotalAmount: function (): number {
        return this.backers.reduce((total, backer) => total + backer.amount, 0);
      },
    },
  }
);

Post.pre("save", function (next) {
  if (this.isModified("backers") || this.isNew) {
    this.total_backed = this.backers.reduce(
      (total, backer) => total + backer.amount,
      0
    );
  }
  next();
});

export const Posts = mongoose.model<TPost>("Post", Post);
