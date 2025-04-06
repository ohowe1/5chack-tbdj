import { TPostFilled } from "../../../../shared/types/post";
import PostCard from "./PostCard";

function PostsTable({ posts }: { posts: TPostFilled[] }) {
  return (
      <div className="">
        {
          posts.length > 0 ? (
            posts.map((post) => (
                <PostCard post={post} key={post._id.toString()} />
            ))
          ) : (
            <p className="text-center text-gray-500">No posts available.</p>
          )
        }
      </div>
  );
}

export default PostsTable;