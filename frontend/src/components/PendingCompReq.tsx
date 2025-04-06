import { useState } from "react"
import { Alert, Card, Text, Group, Button, Avatar, Stack } from "@mantine/core"
import { IconChevronDown, IconInfoCircle, IconX } from "@tabler/icons-react"
import classes from "./css/PendingCompReq.module.css"
import type { TPostCompletionRequestFilled } from "shared/types/post"
import { fetchAPI } from "../utils/api";
import { useNavigate } from "react-router"


export function PendingCompletionRequest({ completionRequest, onHandled }:{
  completionRequest: TPostCompletionRequestFilled;
  onHandled: () => void;
}) {
  const [expanded, setExpanded] = useState(false)
  const icon = <IconInfoCircle />
  // Toggle expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const approveDenyRequests = async (status: string) => {
    const statusRequest = await fetchAPI(`completions/${completionRequest._id}/gavel`, "POST", {
      decision: status
    })
    onHandled();    
  }

  // Compact alert view
  if (!expanded) {
    return (
      <Alert
        variant="light"
        color="cyan"
        radius="md"
        withCloseButton={false}
        title="Pending Completion Request"
        icon={icon}
        classNames={{ root: classes.alertRoot }}
        onClick={toggleExpanded}
      >
        <div className={classes.alertContent}>
          <div>
            {completionRequest.post.title} completed by {completionRequest.requester.displayName} is pending review.
          </div>
          <Button variant="subtle" color="cyan" size="xs" className={classes.checkButton}>
            <IconChevronDown size={18} />
          </Button>
        </div>
      </Alert>
    )
  }

  // Expanded card view
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.expandedCard}>
      <Card.Section className={classes.cardHeader} onClick={toggleExpanded} p="md">
        <Group justify="space-between">
          <Group>
            <IconInfoCircle color="var(--mantine-color-cyan-6)" size={24} />
            <Text variant="light" c="cyan" fw={600} size="md">
              Pending Completion Request
            </Text>
          </Group>
          <Button
            variant="subtle"
            color="gray"
            size="xs"
            className={classes.closeExpandedButton}
          >
            <IconX size={18} />
          </Button>
        </Group>
      </Card.Section>

      <Stack mt="sm">
        <Group>
          <Text fw={500}>Post:</Text>
          <Text>{completionRequest.post.title}</Text>
        </Group>

        <Group>
          <Text fw={500}>Requester:</Text>
          <Group>
            <Avatar src={null} size="sm" radius="xl" />
            <Text>{completionRequest.requester.displayName}</Text>
          </Group>
        </Group>

        {completionRequest.post.description && (
          <div>
            <Text fw={500}>Completion Details:</Text>
            <Text size="sm" mt="xs">
              {completionRequest.comment || "No additional comments provided."}
            </Text>
          </div>
        )}

        <Group justify="flex-end" mt="md">
          <Button 
            variant="outline" 
            color="red"
            onClick={() => approveDenyRequests("decline")}
          >
            Decline
          </Button>
          <Button 
            color="green" 
            onClick={() => approveDenyRequests("approve")}
          >Accept</Button>
        </Group>
      </Stack>
    </Card>
  )
}
