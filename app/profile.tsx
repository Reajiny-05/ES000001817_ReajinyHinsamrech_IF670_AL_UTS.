import React, { useState } from "react";
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import CustomSidebar from "./components/CustomSidebar";
import HeaderBar from "./components/HeaderBar";
import { useShop } from "./context/ShopContext";

export default function ProfileScreen() {
  const { darkMode } = useShop();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const bg = darkMode ? "#777" : "#ddd";
  const card = darkMode ? "#999" : "#fff";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <HeaderBar title="Profile" onMenuPress={() => setSidebarVisible(true)} />
      <CustomSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />

      <View style={[styles.card, { backgroundColor: card }]}>
        <Image
          source={{ uri: "https://picsum.photos/200" }}
          style={styles.image}
        />
        <Text style={styles.name}>Reajiny Hinsamrech</Text>
        <Text style={styles.nim}>ES000001817</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    alignItems: "center",
    padding: 30,
    borderRadius: 20,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  nim: {
    fontSize: 18,
    fontWeight: "600",
  },
});