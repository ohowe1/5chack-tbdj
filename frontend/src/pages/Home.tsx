import DefaultLayout from "../components/DefaultLayout";
import PostsTable from "../components/posts/PostsTable";
import {Link} from "@heroui/react"
import {Button} from '@mantine/core';
import {PlusIcon} from "@heroicons/react/24/outline";

function Home() {

  return (
    <DefaultLayout>
      <div className="relative h-full">
        <h1 className='text-2xl font-bold'>Welcome to Bountee!</h1>
        <p>Explore commissions to complete</p>
        <PostsTable />

        <div className='absolute right-0 bottom-2'>
        <Link
          href="/create-post"
        >
        <Button 
          className='p-0 absolute right-0 bottom-2 rounded'
          radius="xl"
          size="md"
        >
          <PlusIcon className="size-6" />
        </Button>
        </Link>
        
        </div>
        
      </div>
    </DefaultLayout>
  );
}

export default Home;
