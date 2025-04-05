import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import PostDetails from './pages/PostDetails';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/post/:id" element={<PostDetails />} />
    </Routes>
  )
}

export default App
