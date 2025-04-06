import { Box } from "@mantine/core"
import ProfileLayout from "../components/ProfileLayout";

function Profile() {
  return (
      <Box>
      <ProfileLayout>
        <h1 className="font-bold text-xl mb-1">Profile Dashboard</h1>
        <p className="mb-6 font text-sm">Welcome to your profile dashboard. Select an option from the sidebar to get started.</p>
      </ProfileLayout>
      </Box>
    
  )
}

export default Profile
// import DefaultLayout from "../components/DefaultLayout";
// import { ProfileNavBar } from "../components/ProfileNavbar";
// import {
//   Anchor,
//   Button,
//   Checkbox,
//   Divider,
//   Group,
//   Paper,
//   PaperProps,
//   Stack,
//   Text,
//   TextInput,
//   Container,
//   Box,
// } from '@mantine/core';

// function Profile() {
//   return (
//     <Box
//       w="100%"
//       display="flex"
//       style={{ justifyContent: "flex-start" }}
//       p={0}
//       m={0}
//     >
//       <ProfileNavBar />
//     </Box>
//   );
// }

// export default Profile;
