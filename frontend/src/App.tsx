import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import PostDetails from './pages/PostDetails';
import NotificationsPage from "./pages/Notifications.tsx";
import OutgoingBounteesPage from "./pages/OutgoingBountees.tsx";
import IncomingBounteesPage from "./pages/IncomingBountees.tsx";
import BillingPage from "./pages/Billing.tsx";
import SettingsPage from "./pages/Settings.tsx";
// import ProfileLayout from "./components/ProfileLayout";
import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<PostDetails />} />

        <Route path="/profile/notifications" element={<NotificationsPage />} />
        <Route path="/profile/outgoing" element={<OutgoingBounteesPage />} />
        <Route path="/profile/incoming" element={<IncomingBounteesPage />} />
        <Route path="/profile/billing" element={<BillingPage />} />
        <Route path="/profile/settings" element={<SettingsPage />} />
      </Routes>
    </MantineProvider>
  );
}

export default App
