import { Post } from "models/post.model";
import mongoose, { Query } from "mongoose";
import { TPost } from "shared/types/post";

function populatePost(query: mongoose.Query<any[], any, any, TPost>) {
  return query.populate('author').populate('organization');
}

export async function getPosts() : Promise<Query<any[], any, any, TPost[]> | null> {
  const Posts = mongoose.model('Post', Post);

  return populatePost(Posts.find());
}

export async function getPost(post_uuid: string) : Promise<Query<any, any, any, TPost> | null> {
  const Posts = mongoose.model('Post', Post);

  return populatePost(Posts.findOne({ uuid: post_uuid }));
}

export async function getPostsByOrganization(organization_uuid: string) : Promise<Query<any[], any, any, TPost[]> | null> {
  const Posts = mongoose.model('Post', Post);

  return populatePost(Posts.find({ organization: organization_uuid }));
}

export async function createPost(post_obj: any) {
  const Posts = mongoose.model('Post', Post);
  
  const existingPost = await Posts.exists({
    uuid: post_obj.uuid,
  });
  
  if (existingPost) {
    return null;
  }
  
  const newPost = new Posts(post_obj);
  return newPost.save();
}
