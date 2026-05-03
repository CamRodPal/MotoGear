const express    = require("express");
const cors       = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares globales ────────────────────────────────────────────────────
app.use(cors());                        // Permite peticiones desde la app móvil
app.use(express.json());                // Parsea el body como JSON

// ── Rutas ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);

// Ruta de salud para verificar que el servidor está activo
app.get("/", (req, res) => {
  res.json({ status: "ok", mensaje: "MotoGear API corriendo 🏍️" });
});

// ── Iniciar servidor ────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
