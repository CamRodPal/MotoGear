// src/screens/LoginScreen.jsx
import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator,
} from "react-native";
import { colors } from "../styles/theme";
import { login, register } from "../services/authService";

export function LoginScreen({ onLoginSuccess }) {
  const [modo, setModo]         = useState("login"); // "login" | "register"
  const [nombre, setNombre]     = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      let data;
      if (modo === "login") {
        data = await login({ email, password });
      } else {
        data = await register({ nombre, email, password });
      }
      onLoginSuccess(data.usuario);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Logo */}
      <View style={styles.logoWrap}>
        <Text style={styles.logo}>
          MOTO<Text style={styles.logoAccent}>GEAR</Text>
        </Text>
        <Text style={styles.logoSub}>MX</Text>
      </View>

      {/* Tabs login / registro */}
      <View style={styles.tabs}>
        {["login", "register"].map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, modo === t && styles.tabActive]}
            onPress={() => { setModo(t); setError(null); }}
          >
            <Text style={[styles.tabText, modo === t && styles.tabTextActive]}>
              {t === "login" ? "Iniciar sesión" : "Registrarse"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Formulario */}
      <View style={styles.form}>
        {modo === "register" && (
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            placeholderTextColor={colors.muted}
            value={nombre}
            onChangeText={setNombre}
            autoCapitalize="words"
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor={colors.muted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={colors.muted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Error */}
        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}

        {/* Botón */}
        <TouchableOpacity
          style={[styles.btn, loading && styles.btnDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.btnText}>
                {modo === "login" ? "Entrar →" : "Crear cuenta →"}
              </Text>
          }
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen:        { flex: 1, backgroundColor: colors.bg, justifyContent: "center", padding: 28 },
  logoWrap:      { alignItems: "center", marginBottom: 40 },
  logo:          { fontSize: 40, fontWeight: "900", color: colors.text, letterSpacing: 6, textTransform: "uppercase" },
  logoAccent:    { color: colors.accent },
  logoSub:       { fontSize: 12, color: colors.dim, letterSpacing: 4, marginTop: 2 },
  tabs:          { flexDirection: "row", marginBottom: 24, borderBottomWidth: 1, borderBottomColor: colors.border },
  tab:           { flex: 1, paddingVertical: 12, alignItems: "center" },
  tabActive:     { borderBottomWidth: 2, borderBottomColor: colors.accent },
  tabText:       { fontSize: 13, fontWeight: "700", color: colors.muted, letterSpacing: 1 },
  tabTextActive: { color: colors.text },
  form:          { gap: 12 },
  input: {
    backgroundColor: "#141414",
    borderWidth: 1, borderColor: colors.border2,
    borderRadius: 4, paddingHorizontal: 16, paddingVertical: 12,
    color: colors.text, fontSize: 14,
  },
  errorBox:  { backgroundColor: "#2a0a0a", borderWidth: 1, borderColor: "#5a1a1a", borderRadius: 4, padding: 10 },
  errorText: { color: "#ff6b6b", fontSize: 12 },
  btn:          { backgroundColor: colors.accent, padding: 14, borderRadius: 4, alignItems: "center", marginTop: 4 },
  btnDisabled:  { opacity: 0.6 },
  btnText:      { color: "#fff", fontSize: 14, fontWeight: "900", letterSpacing: 2, textTransform: "uppercase" },
});
