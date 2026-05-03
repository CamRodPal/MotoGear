import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { products }      from "./src/data/products";
import { colors }        from "./src/styles/theme";
import { getCartProducts, getTotalItems, getTotalPrice } from "./src/utils/format";
import { getSession, logout } from "./src/services/authService";

import { Header }        from "./src/components/Header";
import { NavBar }        from "./src/components/NavBar";
import { HomeScreen }    from "./src/screens/HomeScreen";
import { ChatScreen }    from "./src/screens/ChatScreen";
import { CartScreen }    from "./src/screens/CartScreen";
import { SuccessScreen } from "./src/screens/SuccessScreen";
import { LoginScreen }   from "./src/screens/LoginScreen";

export default function App() {
  const [screen,       setScreen]       = useState("home");
  const [cart,         setCart]         = useState({});
  const [wishlist,     setWishlist]     = useState(new Set());
  const [notification, setNotification] = useState(null);
  const [usuario,      setUsuario]      = useState(null);
  const [authLoading,  setAuthLoading]  = useState(true);

  // Verificar sesión guardada al iniciar
  useEffect(() => {
    getSession().then((session) => {
      if (session) setUsuario(session.usuario);
      setAuthLoading(false);
    });
  }, []);

  // Carrito
  const totalItems   = getTotalItems(cart);
  const totalPrice   = getTotalPrice(products, cart);
  const cartProducts = getCartProducts(products, cart);

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2200);
  };

  const addToCart = (product) => {
    setCart((prev) => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
    notify(`${product.name.split(" ").slice(0, 2).join(" ")} agregado ✓`);
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id]--;
      else delete next[id];
      return next;
    });
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleLogout = async () => {
    await logout();
    setUsuario(null);
    setCart({});
    setScreen("home");
  };

  // Splash de carga
  if (authLoading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.splash}>
          <Text style={styles.splashLogo}>MOTO<Text style={{ color: colors.accent }}>GEAR</Text></Text>
          <ActivityIndicator color={colors.accent} style={{ marginTop: 20 }} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // Pantalla de login / registro
  if (!usuario) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
          <LoginScreen onLoginSuccess={(u) => setUsuario(u)} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // Pantalla de éxito
  if (screen === "success") {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
          <SuccessScreen
            totalPrice={totalPrice}
            onContinue={() => { setCart({}); setScreen("home"); }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // Layout principal
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={colors.bg} />

        {notification && (
          <View style={styles.toast}>
            <Text style={styles.toastText}>{notification}</Text>
          </View>
        )}

        <Header screen={screen} totalItems={totalItems} onNavigate={setScreen} />

        {/* Barra de usuario */}
        <View style={styles.userBar}>
          <Text style={styles.userGreet}>
            👋 Hola, <Text style={{ color: colors.accent }}>{usuario.nombre.split(" ")[0]}</Text>
          </Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutBtn}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {screen === "home" && (
            <HomeScreen
              wishlist={wishlist}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              onNavigate={setScreen}
            />
          )}
          {screen === "chat" && <ChatScreen onAddToCart={addToCart} />}
          {screen === "cart" && (
            <CartScreen
              cartProducts={cartProducts}
              cart={cart}
              totalItems={totalItems}
              totalPrice={totalPrice}
              onAdd={addToCart}
              onRemove={removeFromCart}
              onNavigate={setScreen}
              onCheckout={() => setScreen("success")}
            />
          )}
        </View>

        <NavBar screen={screen} totalItems={totalItems} onNavigate={setScreen} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea:   { flex: 1, backgroundColor: colors.bg },
  splash:     { flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center" },
  splashLogo: { fontSize: 42, fontWeight: "900", color: "#f0ece4", letterSpacing: 6 },
  content:    { flex: 1 },
  toast:      { position: "absolute", top: 70, alignSelf: "center", backgroundColor: "#1a8fe8", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 2, zIndex: 999 },
  toastText:  { color: "#fff", fontSize: 12, fontWeight: "700", letterSpacing: 1 },
  userBar:    { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#1e1e1e", backgroundColor: "#0d0d0d" },
  userGreet:  { fontSize: 12, color: "#888" },
  logoutBtn:  { fontSize: 11, color: colors.accent, fontWeight: "700", letterSpacing: 1 },
});
