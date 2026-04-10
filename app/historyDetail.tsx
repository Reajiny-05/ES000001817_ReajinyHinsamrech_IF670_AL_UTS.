import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomSidebar from "./components/CustomSidebar";
import HeaderBar from "./components/HeaderBar";
import { useShop } from "./context/ShopContext";

export default function HistoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { history, darkMode } = useShop();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const transaction = history.find((item) => item.id === id);

  const bg = darkMode ? "#777" : "#ddd";
  const card = darkMode ? "#999" : "#fff";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <HeaderBar
        title="History Detail"
        onMenuPress={() => setSidebarVisible(true)}
      />
      <CustomSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {!transaction ? (
          <Text>Transaction not found</Text>
        ) : (
          <View style={[styles.card, { backgroundColor: card }]}>
            <Text style={styles.code}>Code: {transaction.id}</Text>
            <Text style={styles.productsTitle}>Products:</Text>

            {transaction.items.map((item, index) => (
              <Text key={item.id} style={styles.itemText}>
                {index + 1}. {item.name} ({item.quantity}x) = Rp
                {(item.price * item.quantity).toLocaleString()}
              </Text>
            ))}

            <View style={styles.line} />
            <Text style={styles.total}>
              Total: Rp{transaction.total.toLocaleString()}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    padding: 18,
    borderRadius: 18,
  },
  code: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },
  productsTitle: {
    fontWeight: "700",
    marginBottom: 8,
  },
  itemText: {
    fontSize: 15,
    marginBottom: 6,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: "#999",
    marginVertical: 12,
  },
  total: {
    fontSize: 18,
    fontWeight: "700",
  },
});