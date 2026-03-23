import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const API = 'http://localhost:3000/api'
function Login() {
const [registro, setRegistro] = useState('')
const [contrasena, setContrasena] = useState('')
const [error, setError] = useState('')
const navigate = useNavigate()
const handleLogin = async () => {
try {
    const response = await axios.post(`${API}/auth/login`, {
    registro_academico: registro,
    contrasena: contrasena
      })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario))
      navigate('/feed')
    } catch (err) {
      setError(err.response?.data?.error || 'Error al conectar')
    }
  }
  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <input
    type="text"
    placeholder="Registro Académico"
    value={registro}
    onChange={(e) => setRegistro(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />
      {error && <p style={{color: 'red'}}>{error}</p>}
      <button onClick={handleLogin}>Ingresar</button>
      <p>
        ¿No tienes cuenta?{' '}
    <span
    onClick={() => navigate('/registro')}
     style={{cursor: 'pointer', color: 'blue'}}
     >
    Regístrate
    </span>
      </p>
    </div>
  )
}

export default Login