import { Stack } from "expo-router";
import "react-native-gesture-handler";
import { ShopProvider } from "./context/ShopContext";

export default function RootLayout() {
  return (
    <ShopProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="wishlist" />
        <Stack.Screen name="history" />
        <Stack.Screen name="historyDetail" />
        <Stack.Screen name="profile" />
      </Stack>
    </ShopProvider>
  );
}