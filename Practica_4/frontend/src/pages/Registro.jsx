import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const API = "http://localhost:3000/api"
function Registro() {
  const [form, setForm] = useState({
    registro_academico: "",
    nombres: "",
    apellidos: "",
    correo: "",
    contrasena: ""
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleRegistro = async () => {
    try {
      await axios.post(`${API}/auth/registro`, form)
      navigate('/') 
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar')
    }
  }
  return (
    <div>
    <h2>Registro</h2>
    <input name="registro_academico" placeholder="Registro Académico" onChange={handleChange} />
    <input name="nombres" placeholder="Nombres" onChange={handleChange} />
    <input name="apellidos" placeholder="Apellidos" onChange={handleChange} />
    <input name="correo" placeholder="Correo" type="email" onChange={handleChange} />
    <input name="contrasena" placeholder="Contraseña" type="password" onChange={handleChange} />
    {error && <p style={{color: 'red'}}>{error}</p>}
      <button onClick={handleRegistro}>Registrarse</button>
      <p>
    ¿Ya tienes cuenta?{' '}
    <span onClick={() => navigate('/')} style={{cursor: 'pointer', color: 'blue'}}>
    Inicia sesión
</span>
    </p>
    </div>
  )
}
export default Registro 