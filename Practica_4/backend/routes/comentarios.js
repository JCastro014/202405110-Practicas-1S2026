const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
router.get("/:id_publicacion", async (req, res) => {
  try {
    const { id_publicacion } = req.params;
    const { data, error } = await supabase
      .from("comentario")
      .select("*")
      .eq("id_publicacion", id_publicacion);
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const { id_publicacion, id_usuario, mensaje } = req.body;
    const { data, error } = await supabase
      .from("comentario")
      .insert([{ id_publicacion, id_usuario, mensaje }])
      .select();
    
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;