import { PostCompletionRequests } from "../models/completion.model";
import mongoose, { QueryOptions } from "mongoose";
import {
  POST_COMPLETION_REQUEST_STATUS,
  POST_STATUS,
  TPostCompletionRequest,
} from "shared/types/post";
import { getPost, getPosts } from "./post.controller";
import { createPayout } from "../core/payment";

function populatePostAndApplyOptions(
  query: mongoose.Query<any[], any, any, TPostCompletionRequest>,
  options: QueryOptions = {}
) {
  let q = query.populate("requester").populate("post");

  if (options.fields) {
    q = q.select(options.fields);
  }
  if (options.sort) {
    q = q.sort(options.sort);
  }

  return q;
}

export async function createCompletionRequest(
  postId: string | mongoose.Types.ObjectId,
  requesterId: string | mongoose.Types.ObjectId,
  comment?: string
) {
  const newRequest = new PostCompletionRequests({
    post: postId,
    requester: requesterId,
    comment: comment,
    status: POST_COMPLETION_REQUEST_STATUS.PENDING, // Pending
  });

  return newRequest.save();
}

export async function getCompletionRequest(
  requestId: string | mongoose.Types.ObjectId
) {
  return populatePostAndApplyOptions(
    PostCompletionRequests.findById(requestId)
  );
}

export async function getCompletionRequestsByPost(
  postId: string | mongoose.Types.ObjectId
) {
  return populatePostAndApplyOptions(
    PostCompletionRequests.find({ post: postId })
  );
}

export async function getCompletionRequestsByUser(
  userId: string | mongoose.Types.ObjectId
) {
  return populatePostAndApplyOptions(
    PostCompletionRequests.find({ requester: userId })
  );
}

export async function getCompletionRequestsByPostAuthor(
  authorId: string | mongoose.Types.ObjectId,
  options: QueryOptions = {}
) {
  const posts = await mongoose
    .model("Post")
    .find({ author: authorId })
    .select("_id");
  const postIds = posts.map((post) => post._id);

  return populatePostAndApplyOptions(
    PostCompletionRequests.find({
      post: { $in: postIds },
      status: { $eq: POST_COMPLETION_REQUEST_STATUS.PENDING },
    }).sort({ requested_at: -1 }),
    options
  );
}

export async function approveCompletionRequest(
  requestId: string | mongoose.Types.ObjectId
) {
  const request = await PostCompletionRequests.findById(requestId).populate("post requester");

  if (!request) {
    throw new Error("Completion request not found");
  }
  request.status = POST_COMPLETION_REQUEST_STATUS.APPROVED;

  // decline all the other pending requests for the same post
  await PostCompletionRequests.updateMany(
    {
      post: request.post,
      status: POST_COMPLETION_REQUEST_STATUS.PENDING,
      _id: { $ne: request._id }, // Exclude the approved request
    },
    { status: POST_COMPLETION_REQUEST_STATUS.DENIED }
  );

  const post = await getPost(request.post);
  if (!post) {
    throw new Error("Post not found for the approved completion request");
  }

  const totalBacked = post.total_backed || 0;

  const emailToSendItTo = request.requester.payout_email || request.requester.email;
  if (!emailToSendItTo) {
    throw new Error(
      "Post author does not have a valid email for notifications."
    );
  }

  await createPayout([
    {
      recipient_type: "EMAIL",
      amount: { value: totalBacked.toFixed(2), currency: "USD" },
      receiver: emailToSendItTo,
      note: `Payment for completion of post "${post.title}"`,
      recipient_wallet: "PayPal", // or "Venmo" if you want to specify
    },
  ]);

  // mark the post as completed
  post.status = POST_STATUS.COMPLETED;
  await post.save();

  return request.save();
}
