import DefaultLayout from "../components/DefaultLayout";
import {
  TextInput,
  NumberInput,
  Textarea, 
  Button
} from "@mantine/core";
import { fetchAPI } from "../utils/api";

function CreatePost() {
  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    console.log(data.get("title"));
    const newPost = await fetchAPI("posts", 
      "POST", 
      {
        title: data.get("title"),
        description: data.get("description"),
    })

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
          <NumberInput 
            placeholder="Bounty amount"
            label="Bounty Amount"
            name="amount"
            required 
            min={0}
            />
          <Button
          size="sm"
          type="submit"
          className="w-1/2 mx-auto mt-4"
           >
            Submit
          </Button>
        </form>

      </div>
    </DefaultLayout>
  );
}

export default CreatePost;