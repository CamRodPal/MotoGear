import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../styles/theme";
import { formatCOL } from "../utils/format";

export function SuccessScreen({ totalPrice, onContinue }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.icon}>🏍️</Text>

      <Text style={styles.tag}>PEDIDO CONFIRMADO</Text>

      <Text style={styles.title}>¡A rodar!</Text>

      <Text style={styles.subtitle}>
        Tu pedido fue procesado.{"\n"}Recibirás un correo de confirmación.
      </Text>

      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>TOTAL PAGADO</Text>
        <Text style={styles.totalValue}>{formatCOL(totalPrice)}</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={onContinue}>
        <Text style={styles.btnText}>Seguir comprando</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen:     { flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", padding: 32 },
  icon:       { fontSize: 72, marginBottom: 20 },
  tag:        { fontSize: 11, color: colors.accent, fontWeight: "700", letterSpacing: 3, marginBottom: 12 },
  title:      { fontSize: 32, fontWeight: "900", color: colors.text, textTransform: "uppercase", marginBottom: 12 },
  subtitle:   { fontSize: 13, color: "#666", lineHeight: 22, textAlign: "center", marginBottom: 32 },
  totalBox:   { backgroundColor: colors.surface, borderWidth: 1, borderColor: "#222", borderRadius: 4, padding: 20, alignItems: "center", width: "100%", marginBottom: 32 },
  totalLabel: { fontSize: 10, color: colors.muted, letterSpacing: 2, marginBottom: 4 },
  totalValue: { fontSize: 28, fontWeight: "900", color: colors.accent },
  btn:        { backgroundColor: colors.accent, paddingHorizontal: 40, paddingVertical: 14, borderRadius: 2 },
  btnText:    { color: "#fff", fontSize: 13, fontWeight: "900", letterSpacing: 3, textTransform: "uppercase" },
});
