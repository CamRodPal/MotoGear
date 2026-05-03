// src/data/products.js
// Catálogo de productos y categorías de MotoGear CO

export const products = [
  { id: 1, name: "Casco Integral Arai RX-7V",      price: 4299, category: "Cascos",      img: "🪖", rating: 4.9, reviews: 128, badge: "TOP"  },
  { id: 2, name: "Guantes Alpinestars SP-8 V3",     price: 899,  category: "Guantes",     img: "🧤", rating: 4.7, reviews: 85,  badge: null   },
  { id: 3, name: "Chaqueta Dainese Air Frame D1",   price: 3199, category: "Ropa",        img: "🧥", rating: 4.8, reviews: 203, badge: "NEW"  },
  { id: 4, name: "Botas Sidi Cobra 2 Gore-Tex",     price: 2499, category: "Botas",       img: "👢", rating: 4.6, reviews: 67,  badge: null   },
  { id: 5, name: "Escape Akrapovič Full System",    price: 8900, category: "Performance", img: "🔧", rating: 5.0, reviews: 312, badge: "HOT"  },
  { id: 6, name: "Manubrio Renthal Fatbar 821",     price: 1150, category: "Performance", img: "⚙️", rating: 4.5, reviews: 44,  badge: null   },
  { id: 7, name: "Portaequipaje Givi E55 Maxia",    price: 2200, category: "Equipaje",    img: "🎒", rating: 4.4, reviews: 91,  badge: null   },
  { id: 8, name: "Interceptor Intercom Sena 50S",   price: 5499, category: "Tech",        img: "🎧", rating: 4.8, reviews: 176, badge: "NEW"  },
];

export const categories = [
  "Todos", "Cascos", "Guantes", "Ropa",
  "Botas", "Performance", "Equipaje", "Tech",
];
