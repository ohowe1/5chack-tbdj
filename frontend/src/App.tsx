import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import PostDetails from './pages/PostDetails';
import CreatePost from './pages/CreatePost';

import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';
import { HeroUIProvider } from '@heroui/react';

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
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </MantineProvider>
  );
}

export default App
