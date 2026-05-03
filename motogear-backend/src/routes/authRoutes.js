// src/routes/authRoutes.js
// Define los endpoints de autenticación

const express       = require("express");
const router        = express.Router();
const { register, login, perfil } = require("../controllers/authController");
const { verificarToken }          = require("../middlewares/authMiddleware");

// Rutas públicas
router.post("/register", register);   // POST /api/auth/register
router.post("/login",    login);      // POST /api/auth/login

// Ruta protegida (requiere token)
router.get("/perfil", verificarToken, perfil);  // GET /api/auth/perfil

module.exports = router;
