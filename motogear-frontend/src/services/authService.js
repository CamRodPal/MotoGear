import AsyncStorage from "@react-native-async-storage/async-storage";

// Cambia esta IP por la de tu PC cuando pruebes en el celular físico
// Si usas emulador Android usa: http://10.0.2.2:3000
//const API_URL = "http://10.0.2.2:3000";
const API_URL = "http://192.168.1.3:3000/api/auth";

// ── Registro ─────────────────────────────────────────────────────────────────
export async function register({ nombre, email, password }) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Error al registrarse.");

  await AsyncStorage.setItem("token",   data.token);
  await AsyncStorage.setItem("usuario", JSON.stringify(data.usuario));
  return data;
}

// ── Login ────────────────────────────────────────────────────────────────────
export async function login({ email, password }) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Error al iniciar sesión.");

  await AsyncStorage.setItem("token",   data.token);
  await AsyncStorage.setItem("usuario", JSON.stringify(data.usuario));
  return data;
}

// ── Logout ───────────────────────────────────────────────────────────────────
export async function logout() {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("usuario");
}

// ── Obtener sesión guardada ───────────────────────────────────────────────────
export async function getSession() {
  const token   = await AsyncStorage.getItem("token");
  const usuario = await AsyncStorage.getItem("usuario");
  if (!token || !usuario) return null;
  return { token, usuario: JSON.parse(usuario) };
}

// ── Obtener perfil desde el backend (ruta protegida) ─────────────────────────
export async function getPerfil() {
  const token = await AsyncStorage.getItem("token");
  if (!token) throw new Error("No hay sesión activa.");

  const response = await fetch(`${API_URL}/perfil`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Error al obtener perfil.");
  return data.usuario;
}
