import { Box } from "@mantine/core"
import ProfileLayout from "../components/ProfileLayout"

export default function IncomingBounteesPage() {
    return (
      <Box>
        <ProfileLayout>
        <h1 className="font-bold text-xl mb-1">Incoming Bountees</h1>
        <p className="mb-6 font text-sm">View and manage your incoming bountees here.</p>
        </ProfileLayout>
      </Box>
    )
  }