const bcrypt = require("bcryptjs");
const jwt    = require("jsonwebtoken");
const db     = require("../config/db");

// ── Registro ────────────────────────────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Validación básica
    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres." });
    }

    // Verificar si el email ya existe
    const [existing] = await db.query(
      "SELECT id FROM usuarios WHERE email = ?", [email]
    );
    if (existing.length > 0) {
      return res.status(409).json({ error: "El correo ya está registrado." });
    }

    // Hashear la contraseña
    const hash = await bcrypt.hash(password, 10);

    // Insertar usuario
    const [result] = await db.query(
      "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
      [nombre, email, hash]
    );

    // Generar token JWT
    const token = jwt.sign(
      { id: result.insertId, email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Usuario registrado correctamente.",
      token,
      usuario: { id: result.insertId, nombre, email },
    });

  } catch (err) {
    console.error("Error en register:", err);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// ── Login ───────────────────────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios." });
    }

    // Buscar usuario
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE email = ?", [email]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas." });
    }

    const usuario = rows[0];

    // Verificar contraseña
    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(401).json({ error: "Credenciales incorrectas." });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login exitoso.",
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
    });

  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// ── Perfil (ruta protegida) ─────────────────────────────────────────────────
const perfil = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, nombre, email, created_at FROM usuarios WHERE id = ?",
      [req.usuarioId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
    res.json({ usuario: rows[0] });
  } catch (err) {
    console.error("Error en perfil:", err);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = { register, login, perfil };
