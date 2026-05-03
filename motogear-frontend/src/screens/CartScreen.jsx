// src/screens/CartScreen.jsx
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../styles/theme";
import { formatCOL } from "../utils/format";

export function CartScreen({ cartProducts, cart, totalItems, totalPrice, onAdd, onRemove, onNavigate, onCheckout }) {
  if (cartProducts.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyText}>Tu carrito está vacío</Text>
        <TouchableOpacity style={styles.emptyBtn} onPress={() => onNavigate("chat")}>
          <Text style={styles.emptyBtnText}>🤖 Preguntar al asistente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Título */}
      <View style={styles.titleBox}>
        <Text style={styles.title}>Mi carrito</Text>
        <Text style={styles.subtitle}>{totalItems} {totalItems === 1 ? "artículo" : "artículos"}</Text>
      </View>

      {/* Lista de items */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {cartProducts.map((p) => (
          <View key={p.id} style={styles.item}>
            <View style={styles.itemImg}>
              <Text style={styles.itemEmoji}>{p.img}</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={1}>{p.name}</Text>
              <Text style={styles.itemPrice}>{formatCOL(p.price)} c/u</Text>
              <View style={styles.qtyRow}>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => onRemove(p.id)}>
                  <Text style={styles.qtyBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyNum}>{cart[p.id]}</Text>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => onAdd(p)}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.itemTotal}>{formatCOL(p.price * cart[p.id])}</Text>
          </View>
        ))}
        <View style={{ height: 200 }} />
      </ScrollView>

      {/* Resumen fijo al fondo */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatCOL(totalPrice)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Envío</Text>
          <Text style={[styles.summaryValue, { color: colors.success }]}>GRATIS</Text>
        </View>
        <View style={[styles.summaryRow, styles.summaryTotalRow]}>
          <Text style={styles.summaryTotal}>TOTAL</Text>
          <Text style={[styles.summaryTotal, { color: colors.accent }]}>{formatCOL(totalPrice)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={onCheckout}>
          <Text style={styles.checkoutText}>Finalizar compra →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen:          { flex: 1, backgroundColor: colors.bg },
  empty:           { flex: 1, alignItems: "center", justifyContent: "center", padding: 40 },
  emptyIcon:       { fontSize: 56, marginBottom: 12 },
  emptyText:       { fontSize: 16, fontWeight: "700", color: "#555", marginBottom: 16 },
  emptyBtn:        { backgroundColor: colors.accent, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 2 },
  emptyBtnText:    { color: "#fff", fontSize: 10, fontWeight: "900", letterSpacing: 2 },
  titleBox:        { padding: 20, borderBottomWidth: 1, borderBottomColor: colors.border },
  title:           { fontSize: 28, fontWeight: "900", color: colors.text, letterSpacing: 2, textTransform: "uppercase" },
  subtitle:        { fontSize: 12, color: colors.muted, letterSpacing: 1, marginTop: 2 },
  item:            { flexDirection: "row", alignItems: "center", gap: 12, padding: 16, borderBottomWidth: 1, borderBottomColor: "#141414" },
  itemImg:         { width: 56, height: 56, backgroundColor: colors.surface3, borderRadius: 4, alignItems: "center", justifyContent: "center" },
  itemEmoji:       { fontSize: 30 },
  itemInfo:        { flex: 1 },
  itemName:        { fontSize: 13, fontWeight: "700", color: colors.text },
  itemPrice:       { fontSize: 11, color: colors.accent, fontWeight: "700", marginTop: 2 },
  qtyRow:          { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 6 },
  qtyBtn:          { width: 24, height: 24, backgroundColor: "#1e1e1e", borderWidth: 1, borderColor: "#333", borderRadius: 2, alignItems: "center", justifyContent: "center" },
  qtyBtnText:      { color: colors.text, fontSize: 16, lineHeight: 20 },
  qtyNum:          { fontSize: 13, fontWeight: "700", color: colors.text, minWidth: 16, textAlign: "center" },
  itemTotal:       { fontSize: 15, fontWeight: "900", color: colors.text },
  summary:         { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: "#222", padding: 20, paddingBottom: 28 },
  summaryRow:      { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  summaryLabel:    { fontSize: 12, color: colors.muted },
  summaryValue:    { fontSize: 12, color: colors.muted },
  summaryTotalRow: { borderTopWidth: 1, borderTopColor: "#222", paddingTop: 10, marginTop: 4, marginBottom: 14 },
  summaryTotal:    { fontSize: 20, fontWeight: "900", color: colors.text },
  checkoutBtn:     { backgroundColor: colors.accent, padding: 14, borderRadius: 2, alignItems: "center" },
  checkoutText:    { color: "#fff", fontSize: 13, fontWeight: "900", letterSpacing: 3, textTransform: "uppercase" },
});
