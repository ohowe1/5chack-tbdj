import { TPostFilled } from "../../../../shared/types/post";
import PostCard from "./PostCard";

function PostsTable({ posts, error = "No Bountees Yet" }: { posts: TPostFilled[], error?: string }) {
  return (
      <div className="">
        {
          posts.length > 0 ? (
            posts.map((post) => (
                <PostCard post={post} key={post._id.toString()} />
            ))
          ) : (
            <p className="text-center text-gray-500">{ error }</p>
          )
        }
      </div>
  );
}

export default PostsTable;