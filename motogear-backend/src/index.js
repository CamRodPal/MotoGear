const express    = require("express");
const cors       = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app  = express();
const PORT = process.env.PORT || 3000;

const whitelist = [
  
];

const corsOptions = {
  origin: function (origin. callback){
    if(!origin) return callback (null, true);
    if (whitelist.indexOf(origin) !== -1) {
      callback (null, true);
    } else {
      callback (new Error ("Not allowed by CORS"))
    }
  } ,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

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
