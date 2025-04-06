import { Box } from "@mantine/core"
import ProfileLayout from "../components/ProfileLayout";
import { fetchAPI } from "../utils/api";
import { useEffect, useState } from "react";
import { TPostFilled } from "../../../shared/types/post";
import PostsTable from "../components/posts/PostsTable";


export default function OutgoingBounteesPage() {
    const [posts, setPosts] = useState<TPostFilled[]>([]);
  
    useEffect(() => {
      async function fetchPosts() {
        const response = await fetchAPI("posts/feed/self", "GET");
  
        if (response && Array.isArray(response)) {
          setPosts(response as TPostFilled[]);
        } else {
          console.error("Failed to fetch posts data");
        }
      }
      fetchPosts();
    }, []);

    return (
      <Box>
        <ProfileLayout>
        <h1 className="font-bold text-xl mb-1">Outgoing Bountees</h1>
        <p className="mb-6 font text-sm">Manage your outgoing bountees here.</p>
        <div className='my-4'>
            <PostsTable posts={posts} />

          </div>
        </ProfileLayout>
      </Box>
    )
  }
  