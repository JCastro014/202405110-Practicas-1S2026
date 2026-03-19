const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
router.post("/registro", async (req, res) => {
  try {
    const { registro_academico, nombres, apellidos, correo, contrasena } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const { data, error } = await supabase
      .from("usuario")
      .insert([{ registro_academico, nombres, apellidos, correo, contrasena: hashedPassword }])
      .select();
    if (error) throw error;
    res.status(201).json({ mensaje: "Usuario registrado", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { registro_academico, contrasena } = req.body;
    const { data, error } = await supabase
    .from("usuario")
    .select("*")
    .eq("registro_academico", registro_academico)
    .single();
    if (error || !data) return res.status(401).json({ error: "Usuario no encontrado" });
    const validPassword = await bcrypt.compare(contrasena, data.contrasena);
    if (!validPassword) return res.status(401).json({ error: "Contraseña incorrecta" });
    const token = jwt.sign(
      { id_usuario: data.id_usuario, registro_academico: data.registro_academico },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ mensaje: "Login exitoso", token, usuario: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;