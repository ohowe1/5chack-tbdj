import { Box } from "@mantine/core"
import ProfileLayout from "../components/ProfileLayout"
// import { useParams } from "react-router-dom";
// import { Button, Link } from '@heroui/react';
// import { TPostFilled } from "shared/types/post";
// import { useEffect, useState } from "react";
// import { fetchAPI } from "../utils/api";
// import { TPostCompletionRequest } from "shared/types/post";
import { PendingCompletionRequest } from "../components/PendingCompReq";

export default function NotificationsPage() {
    return (
      <Box>
        <ProfileLayout>
        <h1 className="font-bold text-xl mb-1">Notifications</h1>
        <p className="mb-6 font text-sm">View and manage your notifications here.</p>
            <PendingCompletionRequest completionRequest={
                {
                    post: {
                        total_backed: 100,
                        title: "Sample Post",
                        description: "This is a sample post",
                    },
                    requester: {
                        displayName: "John Doe",
                    },
                    status: 2,
                    created_at: new Date().toISOString(),
                }
            } />
        </ProfileLayout>
      </Box>
    )
  }