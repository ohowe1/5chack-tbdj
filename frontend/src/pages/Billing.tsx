import { Box } from "@mantine/core"
import ProfileLayout from "../components/ProfileLayout"

export default function BillingPage() {
    return (
      <Box>
        <ProfileLayout>
        <h1 className="font-bold text-xl mb-1">Billing</h1>
        <p className="mb-6 font text-sm">Manage your billing information and subscription details here.</p>
        </ProfileLayout>
      </Box>
    )
  }
  