import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import CustomSidebar from "./components/CustomSidebar";
import HeaderBar from "./components/HeaderBar";
import { useShop } from "./context/ShopContext";

export default function WishlistScreen() {
  const { wishlist, removeFromWishlist, moveWishlistToCart, darkMode } =
    useShop();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const bg = darkMode ? "#777" : "#ddd";
  const card = darkMode ? "#999" : "#fff";

  const renderLeftActions = (item: any) => (
    <TouchableOpacity
      style={[styles.actionDelete, { justifyContent: "center", alignItems: "center" }]}
      onPress={() => removeFromWishlist(item.id)}
    >
      <Ionicons name="trash" size={28} color="black" />
    </TouchableOpacity>
  );

  const renderRightActions = (item: any) => (
    <TouchableOpacity
      style={[styles.actionCart, { justifyContent: "center", alignItems: "center" }]}
      onPress={() => moveWishlistToCart(item)}
    >
      <Ionicons name="cart" size={28} color="black" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <HeaderBar title="Wishlist" onMenuPress={() => setSidebarVisible(true)} />
      <CustomSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />

      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 12 }}
        ListEmptyComponent={<Text style={styles.empty}>No items in wishlist</Text>}
        renderItem={({ item }) => (
          <Swipeable
            renderLeftActions={() => renderLeftActions(item)}
            renderRightActions={() => renderRightActions(item)}
          >
            <View style={[styles.itemCard, { backgroundColor: card }]}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text>Rp{item.price.toLocaleString()}</Text>
              </View>
            </View>
          </Swipeable>
        )}
      />
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
    marginBottom: 10,
    borderRadius: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  name: {
    fontWeight: "700",
    fontSize: 18,
  },
  actionDelete: {
    backgroundColor: "red",
    width: 80,
    marginBottom: 10,
    borderRadius: 12,
  },
  actionCart: {
    backgroundColor: "lime",
    width: 80,
    marginBottom: 10,
    borderRadius: 12,
  },
});