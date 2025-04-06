import { Box } from "@mantine/core"
import ProfileLayout from "../components/ProfileLayout"

export default function OutgoingBounteesPage() {
    return (
      <Box>
        <ProfileLayout>
        <h1 className="font-bold text-xl mb-1">Outgoing Bountees</h1>
        <p className="mb-6 font text-sm">Manage your outgoing bountees here.</p>
        </ProfileLayout>
      </Box>
    )
  }
  