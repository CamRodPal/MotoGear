// src/components/ProductCard.jsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../styles/theme";
import { formatCOL } from "../utils/format";

const badgeColor = {
  HOT: colors.accent,
  NEW: colors.info,
  TOP: colors.gold,
};

export function ProductCard({ product, inWishlist, onAddToCart, onToggleWishlist }) {
  const { img, badge, category, name, rating, reviews, price } = product;

  return (
    <View style={styles.card}>
      {/* Imagen */}
      <View style={styles.imgBox}>
        <Text style={styles.emoji}>{img}</Text>

        {badge && (
          <View style={[styles.badge, { backgroundColor: badgeColor[badge] }]}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.wishBtn} onPress={() => onToggleWishlist(product.id)}>
          <Text style={{ fontSize: 14 }}>{inWishlist ? "❤️" : "🤍"}</Text>
        </TouchableOpacity>
      </View>

      {/* Info */}
      <View style={styles.body}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        <Text style={styles.rating}>{"★".repeat(Math.floor(rating))} {rating} ({reviews})</Text>
        <Text style={styles.price}>{formatCOL(price)}</Text>

        <TouchableOpacity style={styles.addBtn} onPress={() => onAddToCart(product)}>
          <Text style={styles.addBtnText}>+ AGREGAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card:      { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 4, overflow: "hidden" },
  imgBox:    { backgroundColor: colors.surface3, height: 110, alignItems: "center", justifyContent: "center" },
  emoji:     { fontSize: 44 },
  badge:     { position: "absolute", top: 8, left: 8, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2 },
  badgeText: { color: "#fff", fontSize: 8, fontWeight: "900", letterSpacing: 2 },
  wishBtn:   { position: "absolute", top: 6, right: 6, backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 14, width: 28, height: 28, alignItems: "center", justifyContent: "center" },
  body:      { padding: 10 },
  category:  { fontSize: 9, color: colors.accent, letterSpacing: 2, fontWeight: "700", textTransform: "uppercase" },
  name:      { fontSize: 13, fontWeight: "700", color: colors.text, marginVertical: 3, lineHeight: 17 },
  rating:    { fontSize: 10, color: colors.muted, marginBottom: 6 },
  price:     { fontSize: 18, fontWeight: "900", color: colors.text },
  addBtn:    { marginTop: 8, backgroundColor: colors.accent, padding: 8, borderRadius: 2, alignItems: "center" },
  addBtnText:{ color: "#fff", fontSize: 10, fontWeight: "900", letterSpacing: 2 },
});
