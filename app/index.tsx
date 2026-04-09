import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomSidebar from "./components/CustomSidebar";
import HeaderBar from "./components/HeaderBar";
import { useShop } from "./context/ShopContext";

export default function HomeScreen() {
  const { products, addToCart, addToWishlist, darkMode } = useShop();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const bg = darkMode ? "#777" : "#47e9f4";
  const card = darkMode ? "#999" : "#fff";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <HeaderBar title="LivShop" onMenuPress={() => setSidebarVisible(true)} />
      <CustomSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />

      <View style={styles.sliderWrap}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {products.slice(0, 5).map((item) => (
            <View key={item.id} style={[styles.slide, { backgroundColor: card }]}>
              <Image source={{ uri: item.image }} style={styles.slideImage} />
              <Text style={styles.slideTitle}>{item.name}</Text>
              <Text>Rp{item.price.toLocaleString()}</Text>
            </View>
          ))}
        </ScrollView>
      </View>



      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={[styles.productCard, { backgroundColor: card }]}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text>Rp{item.price.toLocaleString()}</Text>

            <View style={styles.iconRow}>
              <TouchableOpacity onPress={() => addToWishlist(item)}>
                <Ionicons name="star" size={22} color="gold" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => addToCart(item)}>
                <Ionicons name="add-circle" size={26} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sliderWrap: {
    height: 220,
    marginHorizontal: 12,
    marginVertical: 10,
    borderRadius: 16,
    overflow: "hidden",
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  slideImage: {
    width: 120,
    height: 100,
    borderRadius: 12,
    marginBottom: 10,
  },
  slideTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  productCard: {
    flex: 1,
    margin: 8,
    padding: 12,
    borderRadius: 18,
    alignItems: "center",
    elevation: 4,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginBottom: 8,
  },
  productName: {
    fontWeight: "700",
    fontSize: 16,
  },
  iconRow: {
    marginTop: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});