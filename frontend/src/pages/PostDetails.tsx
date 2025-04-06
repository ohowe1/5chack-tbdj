import DefaultLayout from "../components/DefaultLayout";
import { useParams } from "react-router-dom";
import { Button } from '@heroui/react';


function PostDetails() {
  const { id } = useParams();

  // Fetch post details using the id

  return (
    <DefaultLayout>
      <div className="flex flex-col my-4">
        <div className='my-2'>
          <h1 className="text-3xl font-bold">Post Title Example</h1>
          <h2 className="text-gray-500 text-lg">Author Example | 4/5/25</h2>
        </div>
        
        <p className='break-all'>Description DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription DescriptionDescription Description Description</p>

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