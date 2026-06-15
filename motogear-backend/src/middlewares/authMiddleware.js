const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {

  const authHeader = req.headers["authorization"];
  //const token = authHeader && authHeader.split(" ")[1]; //Linea con Problema
  const token = authHeader?.split(" ")[1]; //Linea corregida usando optional chaining

  if (!token) {
    return res.status(401).json({ error: "Token requerido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id;
    req.usuarioEmail = decoded.email;
    next();
  } catch {
    return res.status(403).json({ error: "Token inválido o expirado." });
  }
};

module.exports = { verificarToken };
