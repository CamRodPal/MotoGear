export const formatCOL = (n) => `$${n.toLocaleString("es-CO")}`;

export const filterByCategory = (products, category) =>
  category === "Todos" ? products : products.filter((p) => p.category === category);

export const getCartProducts = (products, cart) =>
  products.filter((p) => cart[p.id]);

export const getTotalItems = (cart) =>
  Object.values(cart).reduce((a, b) => a + b, 0);

export const getTotalPrice = (products, cart) =>
  Object.entries(cart).reduce((acc, [id, qty]) => {
    const p = products.find((p) => p.id === parseInt(id));
    return acc + (p ? p.price * qty : 0);
  }, 0);
