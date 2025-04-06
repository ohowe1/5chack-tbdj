import { Box } from "@mantine/core"
import ProfileLayout from "../components/ProfileLayout";
export default function SettingsPage() {
    return (
      <Box>
        <ProfileLayout>
        <h1>Settings</h1>
        <p>Configure your account settings here.</p>
        </ProfileLayout>
      </Box>
    )
  }