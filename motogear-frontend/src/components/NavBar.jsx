// src/components/NavBar.jsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../styles/theme";

const NAV_ITEMS = [
  { id: "home", icon: "🏠", label: "Inicio"    },
  { id: "chat", icon: "🤖", label: "Asistente" },
  { id: "cart", icon: "🛒", label: "Carrito"   },
];

export function NavBar({ screen, totalItems, onNavigate }) {
  return (
    <View style={styles.navbar}>
      {NAV_ITEMS.map((n) => {
        const active = screen === n.id;
        return (
          <TouchableOpacity
            key={n.id}
            style={styles.item}
            onPress={() => onNavigate(n.id)}
          >
            <View>
              <Text style={styles.icon}>{n.icon}</Text>
              {n.id === "cart" && totalItems > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalItems}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, active && styles.labelActive]}>
              {n.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    backgroundColor: "#0d0d0d",
    borderTopWidth: 1,
    borderTopColor: "#222",
    paddingBottom: 8,
  },
  item:        { flex: 1, alignItems: "center", paddingTop: 10, gap: 2 },
  icon:        { fontSize: 22 },
  label:       { fontSize: 8, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase", color: "#555" },
  labelActive: { color: colors.accent },
  badge: {
    position: "absolute", top: -4, right: -6,
    backgroundColor: colors.accent,
    borderRadius: 9, width: 16, height: 16,
    alignItems: "center", justifyContent: "center",
  },
  badgeText: { color: "#fff", fontSize: 9, fontWeight: "700" },
});
