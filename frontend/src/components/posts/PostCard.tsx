import type { TPostFilled } from "../../../../shared/types/post";
import { Card, CardBody, Link } from "@heroui/react";

export default function PostCard({ post }: { post: TPostFilled }) {
  return (
    <Link
      href={`/post/${post._id}`} // replace with post.uuid
      className="w-full"
    >
      <Card className="border-1 border-gray-300 rounded-lg shadow-sm w-full mb-3 px-6 py-4">
        <CardBody>
          <div className="flex flex-row justify-between items-center">
            <div>
              <h2 className="font-bold mb-1">{post.title}</h2>
              <h3 className="text-gray-500 text-sm">
                <span>{post.author.displayName}</span>
                <span className="text-gray-400"> • </span>
                <span>
                  {post.created_at
                    ? new Date(post.created_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : ""}
                </span>
              </h3>
            </div>
            <div>
              <h3 className="font-bold text-sm">${post.total_backed}</h3>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
