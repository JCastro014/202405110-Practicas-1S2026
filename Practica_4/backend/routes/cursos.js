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
      .from("curso")
      .select("*");
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const { nombre_curso, creditos, area } = req.body

    const { data, error } = await supabase
      .from("curso")
      .insert([{ nombre_curso, creditos, area }])
      .select()

    if (error) throw error
    res.status(201).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
module.exports = router;