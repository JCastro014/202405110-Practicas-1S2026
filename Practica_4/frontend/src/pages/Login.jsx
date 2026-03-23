import { useState } from "react";
import axios from "axios";
function Login() {
    const [registro, setResgistro] = useState('')
    const [contrasena , setContrasena ] = useState('')
    const navigate = useNavigate()
    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", {
                registro_academico: registro,
                contrasena: contrasena
            })
localStorage.setItem("token", response.data.token)
localStorage.setItem("user", JSON.stringify(response.data.user))

navigate('/feed')
        }
        catch (error) {
            alert("Error en el login")
        }
    }

    return (
        <div>
            <h2>Login</h2> 
           <input 
              type="text"
                placeholder="Registro Academico"
                value={registro}
                onChange={(e) => setResgistro(e.target.value)}
            />
            <input  
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login;


