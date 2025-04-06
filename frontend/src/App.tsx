import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "@mantine/core/styles.css";

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
    <span className="ml-3">Loading...</span>
  </div>
);

// Lazy load all page components
const NotificationsPage = lazy(() => import("./pages/Notifications"));
const OutgoingBounteesPage = lazy(() => import("./pages/OutgoingBountees"));
const FinishedBounteesPage = lazy(() => import("./pages/FinishedBountees"));
const SettingsPage = lazy(() => import("./pages/Settings"));
const BackBounty = lazy(() => import("./pages/BackBounty"));
const Feed = lazy(() => import("./pages/Feed"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const PostDetails = lazy(() => import("./pages/PostDetails"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const EditPost = lazy(() => import("./pages/EditPost"));
const UnloggedinHome = lazy(() => import("./pages/UnloggedinHome"));
const CompleteBounty = lazy(() => import("./pages/CompleteBounty"));

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/unlogged-home" element={<UnloggedinHome />} />

          {/* Protected routes using Outlet pattern */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
            <Route path="/back-bounty/:id" element={<BackBounty />} />
            <Route path="/complete-bounty/:id" element={<CompleteBounty />} />
            <Route path="/profile/notifications" element={<NotificationsPage />} />
            <Route path="/profile/outgoing" element={<OutgoingBounteesPage />} />
            <Route path="/profile/finished" element={<FinishedBounteesPage />} />
            <Route path="/profile/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </MantineProvider>
  );
}

export default App;
