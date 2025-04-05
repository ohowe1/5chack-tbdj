import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';;


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
