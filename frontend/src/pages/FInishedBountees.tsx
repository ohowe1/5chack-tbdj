import { Box } from "@mantine/core"
import ProfileLayout from "../components/ProfileLayout";
import { fetchAPI } from "../utils/api";
import { useEffect, useState } from "react";
import { TPostFilled } from "../../../shared/types/post";
import PostsTable from "../components/posts/PostsTable";

export default function FinishedBounteesPage() {

  

  return (
    <Box>
      <ProfileLayout>
      <h1 className="font-bold text-xl mb-1">Finished Bountees</h1>
      <p className="mb-6 font text-sm">View and manage bountees you've completed or bountees others have completed for you here.</p>
      <div className='my-4'>
          {/* <PostsTable posts={posts} /> */}
        </div>
      </ProfileLayout>
    </Box>

  )
  }