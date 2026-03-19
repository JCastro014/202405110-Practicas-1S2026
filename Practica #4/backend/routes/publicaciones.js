const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("publicacion")
      .select("*")
      .order("fecha", { ascending: false });
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const { id_usuario, id_curso, id_catedratico, mensaje } = req.body;
    const { data, error } = await supabase
      .from("publicacion")
      .insert([{ id_usuario, id_curso, id_catedratico, mensaje }])
      .select();
    
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;