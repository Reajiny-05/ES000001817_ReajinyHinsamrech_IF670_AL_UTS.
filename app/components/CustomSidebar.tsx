import { router } from "expo-router";
import React from "react";
import {
  Modal, Pressable, StyleSheet, Switch, Text, TouchableOpacity, View,
} from "react-native";
import { useShop } from "../context/ShopContext";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function CustomSidebar({ visible, onClose }: Props) {
  const { darkMode, toggleDarkMode } = useShop();

  const goTo = (path: "/wishlist" | "/history" | "/profile" | "/") => {
    onClose();
    router.replace(path);

  };


  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={[styles.sidebar, { backgroundColor: darkMode ? "#333" : "#fff" }]}>
          <Text style={styles.logo}>LivShop</Text>

          <TouchableOpacity style={styles.link} onPress={() => goTo("/")}>
            <Text style={styles.linkText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.link} onPress={() => goTo("/wishlist")}>
            <Text style={styles.linkText}>Wishlist</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.link} onPress={() => goTo("/history")}>
            <Text style={styles.linkText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.link} onPress={() => goTo("/profile")}>
            <Text style={styles.linkText}>Profile</Text>
          </TouchableOpacity>

          <View style={styles.switchRow}>
            <Text style={styles.linkText}>Dark Theme</Text>
            <Switch value={darkMode} onValueChange={toggleDarkMode} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  sidebar: {
    width: 230,
    paddingTop: 60,
    paddingHorizontal: 16,
    borderLeftWidth: 1,
    borderColor: "#ccc",
  },
  logo: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  link: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  linkText: {
    fontSize: 16,
    fontWeight: "600",
  },
  switchRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});