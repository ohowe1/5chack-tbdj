import DefaultLayout from "../components/DefaultLayout";
import { useParams } from "react-router-dom";
import { Button } from '@heroui/react';
import { TPost } from "shared/types/post";
import { useEffect, useState } from "react";
import { fetchAPI } from "../utils/api";


function PostDetails() {
  const { id } = useParams();

  const [ postData, setPostData ] = useState<TPost | null>(null);

  useEffect(() => {
    async function fetchPostDetails() {
      if (!id) return;
      const response = await fetchAPI(`posts/${id}`, "GET");
      if (response && response !== null) {
        setPostData(response as TPost);
      } else {
        console.error("Failed to fetch post details");
      }
    }

    fetchPostDetails();
  }, [id])

  // Fetch post details using the id

  return (
    <DefaultLayout>
      <div className="flex flex-col my-4">
        <div className='my-2'>
          <h1 className="text-3xl font-bold">{postData?.title}</h1>
          <h2 className="text-gray-500 text-lg"> {postData?.author?.toLocaleString()} | {postData?.created_at?.toLocaleString()}</h2>
        </div>
        
        <p className='break-all'>{postData?.description}</p>

        <Button
        className='w-1/2 mx-auto mt-8'
        >
          Sign Me Up!
        </Button>
      </div>
    </DefaultLayout>
  );
}

export default PostDetails;