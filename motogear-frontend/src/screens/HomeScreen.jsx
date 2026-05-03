// src/screens/HomeScreen.jsx
import React, { useState } from "react";
import { View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { products, categories } from "../data/products";
import { colors } from "../styles/theme";
import { filterByCategory } from "../utils/format";
import { ProductCard } from "../components/ProductCard";

export function HomeScreen({ wishlist, onAddToCart, onToggleWishlist, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const filtered = filterByCategory(products, activeCategory);

  // FlatList requiere pares de items para el grid de 2 columnas
  const rows = [];
  for (let i = 0; i < filtered.length; i += 2) {
    rows.push(filtered.slice(i, i + 2));
  }

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroTag}>
          <Text style={styles.heroTagText}>TEMPORADA 2026</Text>
        </View>
        <Text style={styles.heroTitle}>Equipo{"\n"}de élite</Text>
        <Text style={styles.heroSub}>Para quienes viven sobre dos ruedas</Text>
        <Text style={styles.heroDeco}>⚙️</Text>
      </View>

      {/* Banner IA */}
      <TouchableOpacity style={styles.aiBanner} onPress={() => onNavigate("chat")}>
        <Text style={styles.aiIcon}>🤖</Text>
        <View style={styles.aiBannerText}>
          <Text style={styles.aiBannerTitle}>MOTO·AI — Asistente de compras</Text>
          <Text style={styles.aiBannerSub}>Pregúntame qué equipo necesitas</Text>
        </View>
        <Text style={styles.aiBannerArrow}>→</Text>
      </TouchableOpacity>

      {/* Filtros */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={styles.catContent}>
        {categories.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.catBtn, activeCategory === c && styles.catBtnActive]}
            onPress={() => setActiveCategory(c)}
          >
            <Text style={[styles.catText, activeCategory === c && styles.catTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Grid de productos */}
      <View style={styles.grid}>
        {rows.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((p) => (
              <View key={p.id} style={styles.cardWrap}>
                <ProductCard
                  product={p}
                  inWishlist={wishlist.has(p.id)}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                />
              </View>
            ))}
            {/* Relleno si la fila tiene solo 1 item */}
            {row.length === 1 && <View style={styles.cardWrap} />}
          </View>
        ))}
      </View>

      <View style={{ height: 90 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen:         { flex: 1, backgroundColor: colors.bg },
  hero:           { backgroundColor: "#1a1a1a", padding: 24, borderBottomWidth: 2, borderBottomColor: colors.accent, overflow: "hidden" },
  heroTag:        { backgroundColor: colors.accent, alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 3, marginBottom: 10 },
  heroTagText:    { color: "#fff", fontSize: 10, fontWeight: "700", letterSpacing: 3 },
  heroTitle:      { fontSize: 36, fontWeight: "900", color: colors.text, lineHeight: 38, letterSpacing: -1, textTransform: "uppercase", marginBottom: 6 },
  heroSub:        { fontSize: 13, color: colors.muted, letterSpacing: 1 },
  heroDeco:       { position: "absolute", right: 16, top: "30%", fontSize: 72, opacity: 0.07 },
  aiBanner:       { margin: 12, backgroundColor: "#1a0a05", borderWidth: 1, borderColor: "#2a1a10", borderRadius: 4, padding: 14, flexDirection: "row", alignItems: "center", gap: 12 },
  aiIcon:         { fontSize: 28 },
  aiBannerText:   { flex: 1 },
  aiBannerTitle:  { fontSize: 13, fontWeight: "900", color: colors.text, letterSpacing: 1 },
  aiBannerSub:    { fontSize: 10, color: colors.muted, marginTop: 2 },
  aiBannerArrow:  { color: colors.accent, fontSize: 16, fontWeight: "900" },
  catScroll:      { borderBottomWidth: 1, borderBottomColor: "#1a1a1a" },
  catContent:     { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  catBtn:         { paddingHorizontal: 14, paddingVertical: 6, borderWidth: 1, borderColor: "#333", borderRadius: 2 },
  catBtnActive:   { backgroundColor: colors.accent, borderColor: colors.accent },
  catText:        { fontSize: 11, fontWeight: "700", letterSpacing: 2, color: colors.muted, textTransform: "uppercase" },
  catTextActive:  { color: "#fff" },
  grid:           { padding: 12 },
  row:            { flexDirection: "row", gap: 10, marginBottom: 10 },
  cardWrap:       { flex: 1 },
});
