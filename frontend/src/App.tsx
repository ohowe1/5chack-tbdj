import BackBounty from './pages/BackBounty';
import { Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import { ProtectedRoute } from "./components/ProtectedRoute";

import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes using Outlet pattern */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/back-bounty/:id" element={<BackBounty />} />
        </Route>
      </Routes>
    </MantineProvider>
  );
}

export default App;
