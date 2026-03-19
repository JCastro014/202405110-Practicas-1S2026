const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/cursos", require("./routes/cursos"));
app.use("/api/catedraticos", require("./routes/catedraticos"));
app.use("/api/publicaciones", require("./routes/publicaciones"));
app.use("/api/comentarios", require("./routes/comentarios"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});