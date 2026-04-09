import React, { useMemo, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, TextInput,
} from "react-native";
import { router } from "expo-router";
import { useShop } from "./context/ShopContext";
import HeaderBar from "./components/HeaderBar";
import CustomSidebar from "./components/CustomSidebar";

export default function HistoryScreen() {
  const { history, darkMode } = useShop();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [search, setSearch] = useState("");

  const bg = darkMode ? "#777" : "#ddd";
  const card = darkMode ? "#999" : "#fff";

  const filteredHistory = useMemo(() => {
    return history.filter((item) =>
      item.id.toUpperCase().includes(search.toUpperCase())
    );
  }, [history, search]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <HeaderBar title="History" onMenuPress={() => setSidebarVisible(true)} />
      <CustomSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Filter by transaction ID"
        style={styles.input}
      />

      <FlatList
        data={filteredHistory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12 }}
        ListEmptyComponent={<Text style={styles.empty}>No transaction history</Text>}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: card }]}>
            <Text style={styles.code}>Code: {item.id}</Text>
            <Text style={styles.total}>Total: Rp{item.total.toLocaleString()}</Text>

            <TouchableOpacity
              style={styles.detailBtn}
              onPress={() =>
                router.push({
                  pathname: "./historyDetail",
                  params: { id: item.id },
                })
              }
            >
              <Text style={styles.detailText}>Detail</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  empty: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
  },
  card: {
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
  },
  code: {
    fontWeight: "700",
    fontSize: 16,
  },
  total: {
    marginTop: 6,
    marginBottom: 10,
    fontWeight: "600",
  },
  detailBtn: {
    backgroundColor: "lime",
    alignSelf: "center",
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 20,
  },
  detailText: {
    fontWeight: "700",
  },
});