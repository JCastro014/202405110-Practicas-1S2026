import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
const API = "http://localhost:3000/api"
function Comentarios() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [publicacion, setPublicacion] = useState(null)
  const [comentarios, setComentarios] = useState([])
  const [nuevoComentario, setNuevoComentario] = useState("")
  useEffect(() => {
    cargarDatos()
  }, [id])
  const cargarDatos = async () => {
    try {
      const [pubRes, comRes] = await Promise.all([
        axios.get(`${API}/publicaciones/${id}`),
        axios.get(`${API}/comentarios/${id}`)
      ])
      setPublicacion(pubRes.data)
      setComentarios(comRes.data)
    } catch (err) {
      console.error("Error:", err)}}
  const handleComentar = async () => {
    if (!nuevoComentario.trim()) return
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"))
      await axios.post(`${API}/comentarios`, {
        id_publicacion: Number(id),
        id_usuario: usuario.id_usuario,
        mensaje: nuevoComentario
      })
      setNuevoComentario("") 
      cargarDatos()          
    } catch (err) {
      console.error("Error al comentar:", err)}}
  return (
    <div>
      <button onClick={() => navigate("/feed")}>← Volver</button>
      {publicacion && (
        <div style={{border: "1px solid gray", padding: "10px", margin: "10px"}}>
        <p>{publicacion.mensaje}</p>
        <small>{new Date(publicacion.fecha).toLocaleDateString("es-GT")}</small>
        </div>
      )}
      <div>
        <h3>Agregar comentario</h3>
        <textarea
    placeholder="Escribe tu comentario..."
    value={nuevoComentario}
    onChange={(e) => setNuevoComentario(e.target.value)}
    rows={3}
        />
        <br/>
        <button onClick={handleComentar}>Comentar</button>
      </div>
      <h3>{comentarios.length} comentarios</h3>
      {comentarios.map(com => (
        <div key={com.id_comentario} style={{border: "1px solid gray", padding: "10px", margin: "5px"}}>
          <p>{com.mensaje}</p>
        </div>
      ))}
    </div>
  )
}
export default Comentarios