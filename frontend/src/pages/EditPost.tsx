import DefaultLayout from "../components/DefaultLayout";
import PostForm from "../components/posts/PostForm"
import { useParams } from "react-router-dom";
import { TPostFilled } from "shared/types/post";
import { useState, useEffect } from "react";
import { fetchAPI } from "../utils/api";

function EditPost() {
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

  return (
    <DefaultLayout>
      <PostForm post={postData}/>
    </DefaultLayout>
  );
}

export default EditPost;