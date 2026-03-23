import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Feed from './pages/Feed'
import { useNavigate } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App