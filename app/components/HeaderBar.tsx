import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useShop } from "../context/ShopContext";

type Props = {
  title: string;
  onMenuPress: () => void;
};

export default function HeaderBar({ title, onMenuPress }: Props) {
  const router = useRouter();
  const { cartCount, darkMode } = useShop();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#555" : "#3cc7db" },
      ]}
    >
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={28} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={() => router.push("./cart")}>

        <View>
          <Ionicons name="cart" size={26} color="black" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  badge: {
    position: "absolute",
    right: -8,
    top: -6,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 18,
    paddingHorizontal: 4,
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "700",
  },
});