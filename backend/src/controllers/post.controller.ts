import { Posts } from "models/post.model";
import mongoose from "mongoose";
import { TPost } from "shared/types/post";

export interface Options {
  filter?: Record<string, any>;
  fields?: string | Record<string, 1 | 0>;
  sort?: Record<string, 1 | -1>;
}

function populatePostAndApplyOptions(
  query: mongoose.Query<any[], any, any, TPost>,
  options: Options = {}
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

export async function getPost(post_uuid: string) {
  return populatePostAndApplyOptions(Posts.findOne({ uuid: post_uuid }));
}

export async function getPostsByOrganization(
  organization_uuid: string,
  options: Options = {}
) {
  return populatePostAndApplyOptions(
    Posts.find({ organization: organization_uuid }),
    options
  );
}

export async function createPost(post_obj: any) {
  const existingPost = await Posts.exists({
    uuid: post_obj.uuid,
  });

  if (existingPost) {
    return null;
  }

  const newPost = new Posts(post_obj);
  return newPost.save();
}
