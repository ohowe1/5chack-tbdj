import { Posts } from "../models/post.model";
import mongoose, { HydratedDocument } from "mongoose";
import { TPost } from "shared/types/post";
import { QueryOptions } from "./controller";
import { PostCompletionRequests } from "../models/completion.model";

function populatePostAndApplyOptions(
  query: mongoose.Query<any[], any, any, TPost>,
  options: QueryOptions = {}
) {
  let q = query.populate("author").populate("organization");

  if (options.filter) {
    q = q.find(options.filter);
  }
  if (options.fields) {
    q = q.select(options.fields);
  }
  if (options.sort) {
    q = q.sort(options.sort);
  }

  return q;
}

export async function getPosts() {
  return populatePostAndApplyOptions(Posts.find());
}

export async function getPost(
  post_id: string | mongoose.Types.ObjectId,
  organization_id?: string | mongoose.Types.ObjectId
) {
  if (organization_id) {
    return populatePostAndApplyOptions(
      Posts.findOne({ _id: post_id, organization: organization_id })
    );
  }
  return populatePostAndApplyOptions(Posts.findById(post_id));
}

export async function getPostsByOrganization(
  organization_id: string | mongoose.Types.ObjectId,
  options: QueryOptions = {}
) {
  return populatePostAndApplyOptions(
    Posts.find({ organization: organization_id }),
    options
  );
}

export async function getPostsByCompletingUser(
  user_id: string | mongoose.Types.ObjectId,
  options: QueryOptions = {}
) {
  // First find all completion requests made by this user
  const completionRequests = await PostCompletionRequests.find({
    requester: user_id
  });
  
  // Extract the post IDs from these completion requests
  const postIds = completionRequests.map(request => request.post);
  
  // Now find all posts with these IDs
  return populatePostAndApplyOptions(
    Posts.find({ _id: { $in: postIds } }),
    options
  );
}

export async function createPost(post_obj: any) {
  const newPost = new Posts(post_obj);
  return newPost.save();
}
