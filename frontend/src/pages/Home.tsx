import DefaultLayout from "../components/DefaultLayout";
import PostsTable from "../components/posts/PostsTable";
import {
  Link,
  Button
} from "@heroui/react"
import {PlusIcon} from "@heroicons/react/24/outline";

function Home() {

  return (
    <DefaultLayout>
      <div className="relative">
        <div className='h-[80vh] overflow-scroll'>
          <h1 className='text-2xl font-bold'>Welcome to Bountee!</h1>
          <p>Explore commissions to complete</p>

          <div className='my-4'>
            <PostsTable />
          </div>
        </div>
        
        
        

        <div className='absolute right-0 bottom-2'>
        <Link
          href="/create-post"
        >
        <Button 
          className='fixed right-2 bottom-2'
          isIconOnly
          radius="full"
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
