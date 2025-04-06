import { PostCompletionRequests } from "../models/completion.model";
import mongoose, { QueryOptions } from "mongoose";
import {
  POST_COMPLETION_REQUEST_STATUS,
  TPostCompletionRequest,
} from "shared/types/post";

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

  // TODO: notify the post author about the new completion request

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
  const posts = await mongoose.model('Post').find({ author: authorId }).select('_id');
  const postIds = posts.map(post => post._id);

  return populatePostAndApplyOptions(
    PostCompletionRequests.find({ 
      post: { $in: postIds }, 
      status: { $eq: POST_COMPLETION_REQUEST_STATUS.PENDING } 
    }).sort({ createdAt: -1 }),
    options
  );
}
