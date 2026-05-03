// src/screens/ChatScreen.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, KeyboardAvoidingView, Platform,
} from "react-native";
import { products } from "../data/products";
import { colors } from "../styles/theme";
import { formatCOL } from "../utils/format";
import { sendChat } from "../services/geminiApi";

const INITIAL_MESSAGE = {
  role: "assistant",
  content: "¡Hola! Soy MOTO·AI 🏍️ Tu asistente de compras experto. ¿Qué equipo estás buscando hoy?",
};

const QUICK_QUESTIONS = [
  "¿Qué casco me recomiendas?",
  "Necesito equipo completo",
  "¿Cuál es el más vendido?",
  "Opciones bajo $2,000",
];

function mentionedProducts(text) {
  return products.filter(
    (p) =>
      text.toLowerCase().includes(p.name.split(" ")[0].toLowerCase()) ||
      text.toLowerCase().includes(p.category.toLowerCase())
  );
}

export function ChatScreen({ onAddToCart }) {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const scrollRef               = useRef(null);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages, loading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    const userMsg    = { role: "user", content: text };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setLoading(true);

    try {
      const reply = await sendChat(newHistory);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error de conexión: ${e.message} 🔧` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      {/* Cabecera */}
      <View style={styles.chatHeader}>
        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.chatTitle}>MOTO·AI</Text>
        </View>
        <Text style={styles.chatSub}>ASISTENTE DE COMPRAS · EN LÍNEA</Text>
      </View>

      {/* Mensajes */}
      <ScrollView
        ref={scrollRef}
        style={styles.messages}
        contentContainerStyle={{ padding: 16, gap: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((m, i) => {
          const chips = m.role === "assistant" ? mentionedProducts(m.content) : [];
          const isUser = m.role === "user";
          return (
            <View key={i} style={[styles.msgWrap, isUser && styles.msgWrapUser]}>
              {!isUser && <Text style={styles.aiLabel}>🤖 MOTO·AI</Text>}
              <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAI]}>
                <Text style={styles.bubbleText}>{m.content}</Text>
              </View>
              {chips.length > 0 && (
                <View style={styles.chips}>
                  {chips.map((p) => (
                    <TouchableOpacity key={p.id} style={styles.chip} onPress={() => onAddToCart(p)}>
                      <Text style={styles.chipEmoji}>{p.img}</Text>
                      <Text style={styles.chipName} numberOfLines={1}>
                        {p.name.split(" ").slice(0, 3).join(" ")}
                      </Text>
                      <Text style={styles.chipPrice}>{formatCOL(p.price)}</Text>
                      <Text style={styles.chipAdd}>+ AGREGAR</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          );
        })}

        {loading && (
          <View style={styles.msgWrap}>
            <Text style={styles.aiLabel}>🤖 MOTO·AI</Text>
            <View style={styles.bubbleAI}>
              <Text style={{ color: "#555", fontSize: 18, letterSpacing: 4 }}>● ● ●</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Preguntas rápidas */}
      {messages.length <= 1 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickScroll} contentContainerStyle={{ gap: 6, paddingHorizontal: 16 }}>
          {QUICK_QUESTIONS.map((q) => (
            <TouchableOpacity key={q} style={styles.quickBtn} onPress={() => setInput(q)}>
              <Text style={styles.quickText}>{q}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Input */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
          placeholder="Pregúntame sobre equipamiento..."
          placeholderTextColor={colors.muted}
          returnKeyType="send"
        />
        <TouchableOpacity
          style={[styles.sendBtn, loading && styles.sendBtnDisabled]}
          onPress={handleSend}
          disabled={loading}
        >
          <Text style={styles.sendIcon}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen:          { flex: 1, backgroundColor: colors.bg },
  chatHeader:      { padding: 14, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: "#0f0f0f" },
  statusRow:       { flexDirection: "row", alignItems: "center", gap: 8 },
  statusDot:       { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success },
  chatTitle:       { fontSize: 20, fontWeight: "900", letterSpacing: 2, color: colors.text, textTransform: "uppercase" },
  chatSub:         { fontSize: 10, color: colors.accent, letterSpacing: 2, fontWeight: "700", marginTop: 2 },
  messages:        { flex: 1 },
  msgWrap:         { alignItems: "flex-start", gap: 4 },
  msgWrapUser:     { alignItems: "flex-end" },
  aiLabel:         { fontSize: 9, color: colors.accent, fontWeight: "700", letterSpacing: 2 },
  bubble:          { maxWidth: "82%", padding: 12, borderRadius: 14 },
  bubbleUser:      { backgroundColor: colors.accent, borderBottomRightRadius: 2 },
  bubbleAI:        { backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border2, borderBottomLeftRadius: 2 },
  bubbleText:      { fontSize: 13, color: colors.text, lineHeight: 19 },
  chips:           { gap: 6 },
  chip:            { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#1a1a1a", borderWidth: 1, borderColor: "#2a2a2a", borderRadius: 4, padding: 8 },
  chipEmoji:       { fontSize: 16 },
  chipName:        { flex: 1, fontSize: 11, color: colors.text },
  chipPrice:       { fontSize: 11, color: colors.accent, fontWeight: "700" },
  chipAdd:         { fontSize: 9, color: colors.success, fontWeight: "900" },
  quickScroll:     { paddingVertical: 8, maxHeight: 44 },
  quickBtn:        { paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: "#2a2a2a", backgroundColor: colors.surface, borderRadius: 20 },
  quickText:       { fontSize: 10, fontWeight: "700", color: colors.muted, letterSpacing: 1 },
  inputRow:        { flexDirection: "row", gap: 8, padding: 12, borderTopWidth: 1, borderTopColor: "#1a1a1a", backgroundColor: colors.bg },
  input:           { flex: 1, backgroundColor: "#141414", borderWidth: 1, borderColor: colors.border2, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10, color: colors.text, fontSize: 13 },
  sendBtn:         { width: 44, height: 44, backgroundColor: colors.accent, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  sendBtnDisabled: { opacity: 0.5 },
  sendIcon:        { color: "#fff", fontSize: 16 },
});
