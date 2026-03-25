import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
const API = "http://localhost:3000/api"
function Perfil() {
const { id } = useParams()
const navigate = useNavigate()
const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"))
const esMiPerfil = String(usuarioLogueado?.id_usuario) === String(id)
const [usuario, setUsuario] = useState(null)
const [cursosAprobados, setCursosAprobados] = useState([])
const [todosCursos, setTodosCursos] = useState([])
const [cursoAgregar, setCursoAgregar] = useState("")
const [editando, setEditando] = useState(false)
const [form, setForm] = useState({ nombres: "", apellidos: "", correo: "" })
const [mensaje, setMensaje] = useState("")
useEffect(() => {
cargarDatos()
  }, [id])
const cargarDatos = async () => {
try {
const [userRes, cursosRes, todosCursosRes] = await Promise.all([
    axios.get(`${API}/usuarios/${id}`),
    axios.get(`${API}/usuarios/${id}/cursos`),
    axios.get(`${API}/cursos`)
      ])
    setUsuario(userRes.data)
    setCursosAprobados(cursosRes.data)
    setTodosCursos(todosCursosRes.data)
    setForm({
        nombres: userRes.data.nombres,
        apellidos: userRes.data.apellidos,
        correo: userRes.data.correo
      })
    } catch (err) {
      console.error("Error:", err)
    }
  }
  const handleGuardar = async () => {
    try {
      await axios.put(`${API}/usuarios/${id}`, form)
      setMensaje("Perfil actualizado!")
      setEditando(false)
      cargarDatos()
    } catch (err) {
      setMensaje("Error al actualizar")
    }
  }
  const handleAgregarCurso = async () => {
    if (!cursoAgregar) return
    try {
      await axios.post(`${API}/usuarios/${id}/cursos`, {
        id_curso: Number(cursoAgregar)
      })
      setCursoAgregar("")
      cargarDatos()
      setMensaje("Curso agregado!")
    } catch (err) {
      setMensaje("Error al agregar curso")
    }
  }
  const totalCreditos = cursosAprobados.reduce((suma, c) => suma + (c.creditos || 0), 0)
  if (!usuario) return <div>Cargando...</div>
  return (
    <div>
      <button onClick={() => navigate("/feed")}>← Volver</button>
      <h2>Perfil de Usuario</h2>
      {!editando ? (
        <div>
          <p><b>Nombre:</b> {usuario.nombres} {usuario.apellidos}</p>
          <p><b>Registro:</b> {usuario.registro_academico}</p>
          <p><b>Correo:</b> {usuario.correo}</p>
          {esMiPerfil && (
            <button onClick={() => setEditando(true)}>Editar perfil</button>
          )}
        </div>
      ) : (
        <div>
          <input
            placeholder="Nombres"
            value={form.nombres}
            onChange={(e) => setForm({ ...form, nombres: e.target.value })}
          />
          <input
            placeholder="Apellidos"
            value={form.apellidos}
            onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
          />
          <input
            placeholder="Correo"
            value={form.correo}
            onChange={(e) => setForm({ ...form, correo: e.target.value })}
          />
          <button onClick={handleGuardar}>Guardar</button>
          <button onClick={() => setEditando(false)}>Cancelar</button>
        </div>
      )}
      {mensaje && <p style={{color: "green"}}>{mensaje}</p>}
      <h3>Cursos Aprobados — {totalCreditos} créditos</h3>
      {cursosAprobados.length === 0 ? (
        <p>No hay cursos aprobados.</p>
      ) : (
        cursosAprobados.map(curso => (
          <div key={curso.id_curso} style={{border: "1px solid gray", padding: "5px", margin: "5px"}}>
            <span>{curso.nombre_curso}</span> — <span>{curso.creditos} créditos</span>
          </div>
        ))
      )}
      {esMiPerfil && (
        <div>
          <select value={cursoAgregar} onChange={(e) => setCursoAgregar(e.target.value)}>
            <option value="">Agregar curso aprobado...</option>
            {todosCursos
              .filter(c => !cursosAprobados.find(ca => ca.id_curso === c.id_curso))
              .map(c => (
                <option key={c.id_curso} value={c.id_curso}>{c.nombre_curso}</option>))}
          </select>
          <button onClick={handleAgregarCurso}>+ Agregar</button>
        </div>
      )}
    </div>)}
export default Perfil 