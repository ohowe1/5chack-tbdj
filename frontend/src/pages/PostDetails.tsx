import DefaultLayout from "../components/DefaultLayout";
import { useParams } from "react-router-dom";
import { Button, Link } from '@heroui/react';
import { TPostFilled } from "shared/types/post";
import { useEffect, useState } from "react";
import { fetchAPI } from "../utils/api";

function PostDetails() {
  const { id } = useParams();

  const [postData, setPostData] = useState<TPostFilled | null>(null);

  useEffect(() => {
    async function fetchPostDetails() {
      if (!id) return;
      const response = await fetchAPI(`posts/${id}`, "GET");
      if (response && response !== null) {
        setPostData(response as TPostFilled);
      } else {
        console.error("Failed to fetch post details");
      }
    }

    fetchPostDetails();
  }, [id]);

  // Fetch post details using the id

  return (
    <DefaultLayout>
      <div className="flex flex-col my-4">
        <div className="my-2">
          <h1 className="text-3xl font-bold">{postData?.title}</h1>
          <div className="flex items-center gap-2 text-gray-500 mt-1">
            <span className="font-medium">{postData?.author.displayName}</span>
            <span className="text-gray-400">•</span>
            <span>
              {postData?.created_at
                ? new Date(postData.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : ""}
            </span>
          </div>
        </div>

        <p className="break-all">{postData?.description}</p>

        <div className='flex flex-row justify-center items-center gap-2'>
          <Button
          className='mt-8 bg-gray-400'
          as={Link}
          href={`/back-bounty/${id}`}
          >
            Back Bounty
          </Button>
          <Button
          className=' mt-8'
          >
            Complete Bounty
          </Button>
        </div>
       
      </div>
    </DefaultLayout>
  );
}

export default PostDetails;
