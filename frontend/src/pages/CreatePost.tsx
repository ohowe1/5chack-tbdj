import DefaultLayout from "../components/DefaultLayout";
import {
  TextInput,
  NumberInput,
  Textarea, 
} from "@mantine/core";
import { Button } from "@heroui/react";
import { fetchAPI } from "../utils/api";
import { useNavigate } from 'react-router-dom';
import { TPost } from "shared/types/post";


function CreatePost() {
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const createdBounty = (await fetchAPI("posts", "POST", {
      title: data.get("title"),
      description: data.get("description"),})) as TPost

    navigate(`/back-bounty/${createdBounty._id}`)
  }

  return (
    <DefaultLayout>
      <div className="">
        <div className='mb-4'>
          <h1 className="text-2xl font-bold">Create Bounty</h1>
          <p>Post a bounty for others to complete!</p>
        </div>
        
        <form 
          className='flex flex-col gap-2'
          onSubmit={handleSubmit}
        >
          <TextInput 
            placeholder="Bounty title"
            label="Title"
            name="title"
            required
          />
          <Textarea 
            placeholder="Description"
            label="Description"
            name="description"
            required
          />
          <Button
          type="submit"
          className="w-1/2 mx-auto mt-4"
          
           >
            Create Bounty
          </Button>
        </form>

      </div>
    </DefaultLayout>
  );
}

export default CreatePost;