import { Box } from "@mantine/core"
import ProfileLayout from "../components/ProfileLayout";
export default function SettingsPage() {
    return (
      <Box>
        <ProfileLayout>
        <h1 className="font-bold text-xl mb-1">Settings</h1>
        <p className="mb-6 font text-sm">Configure your account settings here.</p>
        </ProfileLayout>
      </Box>
    )
  }