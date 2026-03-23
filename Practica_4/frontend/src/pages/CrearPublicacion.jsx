import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const API = "http://localhost:3000/api"



function CrearPublicacion() {
    const [tipo, setTipo] = useState("publicacion")
    const [cursos, setCursos] = useState([])
    const [catedraticos, setCatedraticos] = useState([])
    const [idSeleccionado, setIdSeleccionado] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
    const cargar = async () => {
      const [cursoRes, catRes] = await Promise.all([
        axios.get(`${API}/cursos`),
        axios.get(`${API}/catedraticos`)
      ])
      setCursos(cursoRes.data)
      setCatedraticos(catRes.data)
    }
    cargar()
  }, [])

  const handleCrear = async () => {
    if (!idSeleccionado || !mensaje.trim()) {
      setError("Debes seleccionar un curso/catedrático y escribir un mensaje")
      return
    }
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"))
      await axios.post(`${API}/publicaciones`, {
        id_usuario: usuario.id_usuario,
        id_curso: tipo === "curso" ? Number(idSeleccionado) : null,
        id_catedratico: tipo === "catedratico" ? Number(idSeleccionado) : null,
        mensaje: mensaje
      })
      navigate("/feed")
    } catch (err) {
      setError(err.response?.data?.error || "Error al crear publicación")
    }
  }

  return (
    <div>
      <h2>Nueva Publicación</h2>

      {/* Botones para elegir tipo */}
      <button onClick={() => { setTipo("curso"); setIdSeleccionado("") }}>
        Sobre un Curso
      </button>
      <button onClick={() => { setTipo("catedratico"); setIdSeleccionado("") }}>
        Sobre un Catedrático
      </button>

      {/* Dropdown según el tipo seleccionado */}
      {tipo === "curso" ? (
        <select value={idSeleccionado} onChange={(e) => setIdSeleccionado(e.target.value)}>
          <option value="">Selecciona un curso...</option>
          {cursos.map(c => (
            <option key={c.id_curso} value={c.id_curso}>{c.nombre_curso}</option>
          ))}
        </select>
      ) : (
        <select value={idSeleccionado} onChange={(e) => setIdSeleccionado(e.target.value)}>
          <option value="">Selecciona un catedrático...</option>
          {catedraticos.map(cat => (
            <option key={cat.id_catedratico} value={cat.id_catedratico}>
              {cat.nombres} {cat.apellidos}
            </option>
          ))}
        </select>
      )}

      <textarea
        placeholder="Escribe tu publicación..."
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        rows={4}
      />

      {error && <p style={{color: "red"}}>{error}</p>}

      <button onClick={() => navigate("/feed")}>Cancelar</button>
      <button onClick={handleCrear}>Publicar</button>
    </div>
  )
}
export default CrearPublicacion