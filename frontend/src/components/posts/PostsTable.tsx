import { useEffect, useState } from "react";
import { TPost } from "../../../../shared/types/post";
import PostCard from "./PostCard";
import { fetchAPI } from "../../utils/api";

function PostsTable() {
  const [posts, setPosts] = useState<TPost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetchAPI("posts", "GET");

      if (response && Array.isArray(response)) {
        setPosts(response as TPost[]);
      } else {
        console.error("Failed to fetch posts data");
      }
    }
    fetchPosts();
  }, []);


  return (
      <div className="">
        {
          posts.length > 0 ? (
            posts.map((post) => (
              <PostCard post={post} />
            ))
          ) : (
            <p className="text-center text-gray-500">No posts available.</p>
          )
        }
      </div>
  );
}
export default PostsTable;