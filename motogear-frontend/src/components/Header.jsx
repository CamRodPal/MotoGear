// src/components/Header.jsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../styles/theme";

export function Header({ screen, totalItems, onNavigate }) {
  return (
    <View style={styles.header}>
      {/* Botón volver */}
      {screen !== "home" && (
        <TouchableOpacity onPress={() => onNavigate("home")} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
      )}

      {/* Logo */}
      <Text style={styles.logo}>
        MOTO<Text style={styles.logoAccent}>GEAR</Text>
        <Text style={styles.logoSub}> MX</Text>
      </Text>

      {/* Acciones */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onNavigate("chat")} style={styles.iconBtn}>
          <Text style={styles.iconText}>🤖</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onNavigate("cart")} style={styles.iconBtn}>
          <Text style={styles.iconText}>🛒</Text>
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.bg,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn:    { marginRight: 8 },
  backText:   { color: colors.text, fontSize: 20 },
  logo:       { fontSize: 22, fontWeight: "800", letterSpacing: 4, color: colors.text, textTransform: "uppercase" },
  logoAccent: { color: colors.accent },
  logoSub:    { fontSize: 10, color: colors.dim, letterSpacing: 2 },
  actions:    { flexDirection: "row", gap: 4 },
  iconBtn:    { padding: 4, position: "relative" },
  iconText:   { fontSize: 22 },
  badge: {
    position: "absolute", top: -2, right: -2,
    backgroundColor: colors.accent,
    borderRadius: 9, width: 18, height: 18,
    alignItems: "center", justifyContent: "center",
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },
});
