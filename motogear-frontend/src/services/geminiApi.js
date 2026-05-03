import { products } from "../data/products";

const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

export const SYSTEM_PROMPT = `
Eres MOTO·AI, el asistente de compras experto de MotoGear MX, una tienda de accesorios para motocicletas.
Tu personalidad es directa, apasionada por las motos y muy conocedora del mundo del motociclismo.

Tienes acceso al siguiente catálogo de productos:
${products
  .map(
    (p) =>
      `- ${p.name} | Categoría: ${p.category} | Precio: $${p.price.toLocaleString("es-CO")} COL | Rating: ${p.rating}/5 (${p.reviews} reseñas)`
  )
  .join("\n")}

Puedes ayudar a los clientes a:
1. Encontrar el producto ideal según su necesidad, tipo de moto o presupuesto
2. Comparar productos entre sí
3. Dar consejos de seguridad vial y equipamiento
4. Explicar características técnicas de los productos
5. Recomendar combos o conjuntos completos de equipo

Reglas:
- Responde siempre en español
- Sé conciso (máximo 3-4 oraciones por respuesta)
- Cuando recomiendes un producto, menciona su nombre exacto del catálogo
- Usa emojis de motos ocasionalmente 🏍️
- Si preguntan por algo fuera del catálogo, ofrece el producto más similar disponible
- No inventes productos que no estén en el catálogo
`.trim();

/**
 * Envía el historial de mensajes a Gemini y devuelve la respuesta como string.
 * @param {Array<{role: "user"|"assistant", content: string}>} messages
 * @returns {Promise<string>}
 */
export async function sendChat(messages) {
  if (!API_KEY) {
    throw new Error("Falta EXPO_PUBLIC_GEMINI_API_KEY en el archivo .env");
  }

  const response = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sin respuesta.";
}
