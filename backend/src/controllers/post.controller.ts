import { Posts } from "../models/post.model";
import mongoose, { HydratedDocument } from "mongoose";
import { TPost } from "shared/types/post";
import { QueryOptions } from "./controller";

function populatePostAndApplyOptions(
  query: mongoose.Query<any[], any, any, TPost>,
  options: QueryOptions = {}
) {
  let q = query.populate("author").populate("organization");

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

export async function getPost(post_id: string | mongoose.Types.ObjectId, options: QueryOptions = {}) {
  return populatePostAndApplyOptions(Posts.findById(post_id), options);
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

export async function createPost(post_obj: any) {
  const newPost = new Posts(post_obj);
  return newPost.save();
}
