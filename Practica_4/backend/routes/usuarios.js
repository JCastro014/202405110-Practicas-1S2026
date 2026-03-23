const express = require("express")
const router = express.Router()
const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from("usuario")
      .select("id_usuario, registro_academico, nombres, apellidos, correo")
      
      .eq("id_usuario", id)
      .single()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { nombres, apellidos, correo } = req.body
  

    const { data, error } = await supabase
      .from("usuario")
      .update({ nombres, apellidos, correo }) 
      .eq("id_usuario", id)
      .select()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/:id/cursos", async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from("curso_aprobado")       
      .select("*, curso(*)")       
      .eq("id_usuario", id)

    if (error) throw error
    const cursos = data.map(item => item.curso)
    res.json(cursos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post("/:id/cursos", async (req, res) => {
  try {
    const { id } = req.params
    const { id_curso } = req.body

    const { data, error } = await supabase
      .from("curso_aprobado")
      .insert([{ id_usuario: Number(id), id_curso }])
      .select()

    if (error) throw error
    res.status(201).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router