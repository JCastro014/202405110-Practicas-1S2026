import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Feed from './pages/Feed'
import Registro from './pages/Registro'        
import CrearPublicacion from './pages/CrearPublicacion'  
import Perfil from './pages/Perfil'            
import Comentarios from './pages/Comentarios'

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/crear" element={<CrearPublicacion />} />
        <Route path="/perfil/:id" element={<Perfil />} />
        <Route path="/publicacion/:id" element={<Comentarios />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App