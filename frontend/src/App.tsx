import { Route, Routes } from "react-router-dom";
import Profile from './pages/Profile';
import Login from './pages/Login';
import PostDetails from './pages/PostDetails';
import NotificationsPage from "./pages/Notifications.tsx";
import OutgoingBounteesPage from "./pages/OutgoingBountees.tsx";
import IncomingBounteesPage from "./pages/IncomingBountees.tsx";
import BillingPage from "./pages/Billing.tsx";
import SettingsPage from "./pages/Settings.tsx";
import CreatePost from './pages/CreatePost';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import BackBounty from './pages/BackBounty';
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import CompleteBounty from "./pages/CompleteBounty";

import { ProtectedRoute } from "./components/ProtectedRoute";
import "@mantine/core/styles.css";

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/profile/notifications" element={<NotificationsPage />} />
        <Route path="/profile/outgoing" element={<OutgoingBounteesPage />} />
        <Route path="/profile/incoming" element={<IncomingBounteesPage />} />
        <Route path="/profile/billing" element={<BillingPage />} />
        <Route path="/profile/settings" element={<SettingsPage />} />
        <Route path="/create-post" element={<CreatePost />} />
        
        {/* Protected routes using Outlet pattern */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/back-bounty/:id" element={<BackBounty />} />
          <Route path="/complete-bounty/:id" element={<CompleteBounty />} />
        </Route>
      </Routes>
    </MantineProvider>
  );
}

export default App;
