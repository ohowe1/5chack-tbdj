import DefaultLayout from "../components/DefaultLayout";
import { ProfileNavBar } from "../components/ProfileNavbar";
import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PaperProps,
  Stack,
  Text,
  TextInput,
  Container,
  Box,
} from '@mantine/core';

function Profile() {
  return (
    <Box
      w="100%"
      display="flex"
      style={{ justifyContent: "flex-start" }}
      p={0}
      m={0}
    >
      <ProfileNavBar />
    </Box>
  );
}

export default Profile;
