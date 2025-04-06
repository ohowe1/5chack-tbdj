import DefaultLayout from "../components/DefaultLayout";
import { useParams } from "react-router-dom";
import { Button, Link } from "@heroui/react";
import { IconEdit } from "@tabler/icons-react";
import { TPostFilled } from "shared/types/post";
import { useEffect, useState } from "react";
import { fetchAPI } from "../utils/api";
import { useAuth } from "../context/AuthContext";

function PostDetails() {
  const { id } = useParams();
  const { user } = useAuth();

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
          {/* <div className="flex flex-row justify-end	">
          {
              user?._id == postData?.author._id ? 
              <Button 
                className='bg-[#67c2ce]' 
                startContent={<PencilIcon className='size-5'/>}
                isIconOnly
                radius="full"
                as={Link}
                href={`/edit-post/${postData?._id}`}
              >
                
              </Button> :
              null
            }
          </div> */}

          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-4 items-center">
              <h1 className="text-3xl font-bold">{postData?.title}</h1>
              {user?._id == postData?.author._id ? (
                <Button
                  className="bg-default"
                  startContent={<IconEdit className="size-4" />}
                  isIconOnly
                  radius="full"
                  size="sm"
                  as={Link}
                  href={`/edit-post/${postData?._id}`}
                ></Button>
              ) : null}
            </div>
            <h1 className="text-3xl font-bold text-[#4db7c5]">
              $ {postData?.total_backed}
            </h1>
          </div>

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

        {postData?.status === 1 ? (
          <div className="mt-8 text-green-800 font-bold">
            This bounty has been completed and is no longer accepting backers.
          </div>
        ) : postData?.status === 2 ? (
          <div className="mt-8 text-red-500 font-bold">
            This bounty has been canceled and is no longer accepting backers.
          </div>
        ) : (
          <div className="flex flex-row justify-center items-center gap-2">
            <Button className="mt-8" as={Link} href={`/back-bounty/${id}`}>
              Back Bounty
            </Button>
            <Button
              as={Link}
              href={`/complete-bounty/${postData?._id}`}
              className="mt-8 bg-emerald-400"
            >
              Claim Bounty
            </Button>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}

export default PostDetails;
