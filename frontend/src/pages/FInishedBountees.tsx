import { Box } from "@mantine/core"
import ProfileLayout from "../components/ProfileLayout"

export default function FinishedBounteesPage() {
    return (
      <Box>
        <ProfileLayout>
        <h1 className="font-bold text-xl mb-1">Finished Bountees</h1>
        <p className="mb-6 font text-sm">View and manage bountees you've finished here.</p>
        </ProfileLayout>
      </Box>
    )
  }