import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const API = "http://localhost:3000/api"
function Feed() {
  const [publicaciones, setPublicaciones] = useState([])
  const [cursos, setCursos] = useState([])
  const [catedraticos, setCatedraticos] = useState([])
  const [filtroCurso, setFiltroCurso] = useState("")
  const [filtroCatedratico, setFiltroCatedratico] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    const cargarDatos = async () => {
    const [pubRes, cursoRes, cateRes] = await Promise.all([
    axios.get(`${API}/publicaciones`),
    axios.get(`${API}/cursos`),
    axios.get(`${API}/catedraticos`)
    ])
    setPublicaciones(pubRes.data)
    setCursos(cursoRes.data)
    setCatedraticos(cateRes.data)
    }
    cargarDatos()
  }, [])
  const publicacionesFiltradas = publicaciones.filter(pub => {
  if (filtroCurso && String(pub.id_curso) !== filtroCurso) return false
  if (filtroCatedratico && String(pub.id_catedratico) !== filtroCatedratico) return false
    return true
  })
  return (
  <div>
  <h2>Feed de Publicaciones</h2>
  <button onClick={() => navigate('/crear')}>Crear Publicación</button>
  <button onClick={() => {
    const user = JSON.parse(localStorage.getItem('usuario'))
    navigate(`/perfil/${user.id_usuario}`)
      }}>Mi Perfil</button>
      <button onClick={() => { localStorage.clear(); navigate('/') }}>Cerrar Sesión</button>
      <div>
        <select value={filtroCurso} onChange={(e) => setFiltroCurso(e.target.value)}>
          <option value="">Todos los cursos</option>
          {cursos.map(c => (
            <option key={c.id_curso} value={c.id_curso}>{c.nombre_curso}</option>
          ))}
        </select>
    <select value={filtroCatedratico} onChange={(e) => setFiltroCatedratico(e.target.value)}>
    <option value="">Todos los catedráticos</option>
    {catedraticos.map(cat => (
    <option key={cat.id_catedratico} value={cat.id_catedratico}>
    {cat.nombres} {cat.apellidos}
    </option>
    ))}
    </select>
    </div>
    {publicacionesFiltradas.map(pub => (
    <div key={pub.id_publicacion} style={{border: '1px solid gray', margin: '10px', padding: '10px'}}>
    <p>{pub.mensaje}</p>
    <small>{new Date(pub.fecha).toLocaleDateString('es-GT')}</small>
    <br/>
    <button onClick={() => navigate(`/publicacion/${pub.id_publicacion}`)}>Ver comentarios</button>
    </div>
      ))}

    </div>
  )
}
export default Feed