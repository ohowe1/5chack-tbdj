import type React from "react"

import { Box } from "@mantine/core"
import { ProfileNavBar } from "./ProfileNavbar.tsx"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box w="100%" display="flex" style={{ justifyContent: "flex-start" }} p={0} m={0}>
      <ProfileNavBar />
      <Box style={{ flex: 1, padding: "20px" }}>{children}</Box>
    </Box>
  )
}