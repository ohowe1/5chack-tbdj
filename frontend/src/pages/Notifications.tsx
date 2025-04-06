import { Box } from "@mantine/core";
import ProfileLayout from "../components/ProfileLayout";
// import { useParams } from "react-router-dom";
// import { Button, Link } from '@heroui/react';
// import { TPostFilled } from "shared/types/post";
// import { useEffect, useState } from "react";
// import { fetchAPI } from "../utils/api";
// import { TPostCompletionRequest } from "shared/types/post";
import { PendingCompletionRequest } from "../components/PendingCompReq";
import { TPostCompletionRequestFilled } from "shared/types/post";
import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "../utils/api";

export default function NotificationsPage() {
  const [pendingRequests, setPendingRequests] = useState<
    TPostCompletionRequestFilled[]
  >([]);

  const fetchPendingRequests = useCallback(async () => {
    const response = await fetchAPI("completions/to_review", "GET");
    if (response && Array.isArray(response)) {
      setPendingRequests(response as TPostCompletionRequestFilled[]);
    } else {
      console.error("Failed to fetch pending requests");
    }
  }, [])

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  return (
    <Box>
      <ProfileLayout>
        <h1 className="font-bold text-xl mb-1">Notifications</h1>
        <p className="mb-6 font text-sm">
          View and manage your notifications here.
        </p>
        {pendingRequests.length === 0 ? (
          <p className="text-gray-500">No pending completion requests.</p>
        ) : (
          pendingRequests.map((request) => (
            <div className='py-2'>
              <PendingCompletionRequest
                key={request._id.toString()}
                completionRequest={request}
                onHandled={fetchPendingRequests}
              />
            </div>

          ))
        )}
      </ProfileLayout>
    </Box>
  );
}
