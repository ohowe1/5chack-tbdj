import DefaultLayout from "../components/DefaultLayout";
import PostsTable from "../components/posts/PostsTable";
import { Link, Button, Divider } from "@heroui/react";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { fetchAPI } from "../utils/api";
import { POST_STATUS, TPostFilled } from "../../../shared/types/post";

function Feed() {
  const [pendingPosts, setPendingPosts] = useState<TPostFilled[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetchAPI("posts/feed", "GET");

      if (response && Array.isArray(response)) {
        setPendingPosts(response as TPostFilled[]);
      } else {
        console.error("Failed to fetch posts data");
      }
    }
    fetchPosts();
  }, []);

  return (
    <DefaultLayout>
      <div className="relative">
        <div className="h-[80vh] overflow-scroll">
          <h1 className="text-2xl font-bold">Welcome to Bountee!</h1>
          <p>Explore posts to complete</p>

          <div className="my-4">
            <PostsTable error={"No open posts yet. Create one to get started!"} posts={pendingPosts.filter(post => post.status === POST_STATUS.OPEN)} />
          </div>

          <Divider />
          <h2 className="my-4">Completed Posts</h2>
          <div>
            <PostsTable error={"No completed posts yet."} posts={pendingPosts.filter(post => post.status === POST_STATUS.COMPLETED)} />
          </div>
        </div>

        <div className="absolute right-0 bottom-2">
          <Link href="/create-post">
            <Button className="fixed right-2 bottom-2" isIconOnly radius="full">
              <IconPlus className="size-6" />
            </Button>
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Feed;
