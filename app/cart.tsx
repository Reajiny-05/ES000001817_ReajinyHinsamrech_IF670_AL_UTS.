import React, { useState } from "react";
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomSidebar from "./components/CustomSidebar";
import HeaderBar from "./components/HeaderBar";
import { useShop } from "./context/ShopContext";

export default function CartScreen() {
  const { cart, increaseQty, decreaseQty, totalPrice, checkout, darkMode } =
    useShop();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const bg = darkMode ? "#777" : "#ddd";
  const card = darkMode ? "#999" : "#fff";

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert("Cart is empty");
      return;
    }
    checkout();
    Alert.alert("Checkout successful");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <HeaderBar title="Cart" onMenuPress={() => setSidebarVisible(true)} />
      <CustomSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 12 }}
        ListEmptyComponent={<Text style={styles.empty}>No items in cart</Text>}
        renderItem={({ item }) => (
          <View style={[styles.itemCard, { backgroundColor: card }]}>
            <Image source={item.image} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Rp{item.price.toLocaleString()}</Text>
            </View>

            <View style={styles.qtyBox}>
              <TouchableOpacity onPress={() => decreaseQty(item.id)}>
                <Text style={styles.qtyButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => increaseQty(item.id)}>
                <Text style={styles.qtyButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={[styles.summary, { backgroundColor: card }]}>
        {cart.map((item) => (
          <View key={item.id} style={styles.summaryRow}>
            <Text>
              {item.name} ({item.quantity}x)
            </Text>
            <Text>Rp{(item.price * item.quantity).toLocaleString()}</Text>
          </View>
        ))}

        <View style={styles.line} />
        <Text style={styles.total}>Total: Rp{totalPrice.toLocaleString()}</Text>

        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  empty: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
  },
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  qtyButton: {
    fontSize: 24,
    fontWeight: "700",
    paddingHorizontal: 8,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: "700",
  },
  summary: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: "#999",
    marginVertical: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },
  checkoutBtn: {
    backgroundColor: "lime",
    paddingVertical: 12,
    borderRadius: 22,
    alignItems: "center",
  },
  checkoutText: {
    fontWeight: "700",
    fontSize: 16,
  },
});