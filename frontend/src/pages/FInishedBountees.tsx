import { Box } from "@mantine/core";
import ProfileLayout from "../components/ProfileLayout";
import { fetchAPI } from "../utils/api";
import { useEffect, useState } from "react";
import { TPostFilled } from "shared/types/post";
import PostsTable from "../components/posts/PostsTable";

export default function FinishedBounteesPage() {
  const [posts, setPosts] = useState<TPostFilled[]>([]);

  useEffect(() => {
    const fetchFinishedBountees = async () => {
      try {
        const response = await fetchAPI("posts/feed/other-self", "GET");
        if (Array.isArray(response)) {
          setPosts(response as TPostFilled[]);
        } else {
          console.error("Failed to fetch finished bountees");
        }
      } catch (error) {
        console.error("Error fetching finished bountees:", error);
      }
    };
    fetchFinishedBountees();
  }, []);
  return (
    <Box>
      <ProfileLayout>
        <h1 className="font-bold text-xl mb-1">Your Completed Bountees</h1>
        <p className="mb-6 font text-sm">
          View and manage Bountees you've completed.
        </p>
        <div className="my-4">
          <PostsTable posts={posts} />
        </div>
      </ProfileLayout>
    </Box>
  );
}
