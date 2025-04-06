import React from "react";
import type { TPost } from "../../../../shared/types/post";
import {
  Card,
  CardBody,

  Link
} from "@heroui/react"

export default function PostCard({
  // post,
}: {
  // post: TPost
}) {
  return (
    <Link
      href="/post/1" // replace with post.uuid
      className='w-full'
      >
       <Card 
      className="border-1 border-gray-300 rounded-lg shadow-sm w-full my-4 px-6 py-4"
      >
        <CardBody>
        <div className='flex flex-row justify-between items-center'>
        <div>
          <h2 className='font-bold mb-1'>Title Example</h2>
          <h3 className='text-gray-500 text-sm'>Author Ex. | 4/5/25</h3>
        </div>
        <div>
          <h3 className='font-bold text-sm'>$5</h3>
        </div>
      </div>
        </CardBody>
     
     </Card>
    </Link>

  );
}