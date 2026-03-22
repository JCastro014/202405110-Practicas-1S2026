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
      .from("catedratico")
      .select("*");
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;