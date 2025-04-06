import {
  TextInput,
  Textarea, 
} from "@mantine/core";
import { Button } from "@heroui/react";
import { fetchAPI } from "../../utils/api";
import { useNavigate } from 'react-router-dom';
import { TPostFilled } from "shared/types/post";
import { useEffect, useState } from "react"


function PostForm({ post }: { post: TPostFilled | null } ) {

  const navigate = useNavigate();
  const [title, setTitle] = useState(post ? post.title : '');
  const [description, setDescription] = useState(post ? post.description : '');

  useEffect(() => {
    setTitle(post ? post.title : '')
    setDescription(post ? post.description : '')
  }, [post])

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    if (!post) {
        const createdBounty = (await fetchAPI("posts", "POST", {
        title: data.get("title"),
        description: data.get("description"),})) as TPostFilled
        navigate(`/back-bounty/${createdBounty._id}`)
    } else {
       const editedBounty = (await fetchAPI(`posts/${post._id}`, "PUT", {
        title: data.get("title"),
        description: data.get("description"),})) as TPostFilled
        navigate(`/post/${editedBounty._id}`)
    }
  };

  const changeStatus = async () => {
    
  }

  return (
      <div className="">
        <div className='mb-4'>
          <h1 className="text-2xl font-bold">{post ? "Edit Bounty" : "Create Bounty"}</h1>
          <p>{post ? "Update your bounty posting" : "Post a bounty for others to complete!"}</p>
        </div>
        
        <form 
          className='flex flex-col gap-2'
          onSubmit={handleSubmit}
        >
          <TextInput 
            placeholder="Bounty title"
            label="Title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
            required
          />
          <Textarea 
            placeholder="Description"
            label="Description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
            required
          />
          <Button
          type="submit"
          className="w-1/2 mx-auto mt-4"
           >
            {post ? "Edit Bounty" : "Create Bounty"}          
          </Button>
          {
            post ? 
            <Button
              className="w-1/2 mx-auto"
              color="danger"
              >
                Cancel Bounty          
          </Button> :
          null
          }
        </form>

      </div>
  );
}

export default PostForm;