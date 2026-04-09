import React, { createContext, useContext, useMemo, useState } from "react";
import { Product, products } from "../data/products";

type CartItem = Product & {
  quantity: number;
};

type HistoryItem = {
  id: string;
  items: CartItem[];
  total: number;
};

type ShopContextType = {
  products: Product[];
  wishlist: Product[];
  cart: CartItem[];
  history: HistoryItem[];
  darkMode: boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  addToCart: (product: Product) => void;
  moveWishlistToCart: (product: Product) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  checkout: () => void;
  toggleDarkMode: () => void;
  cartCount: number;
  totalPrice: number;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const generateTransactionId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let result = "";
  for (let i = 0; i < 3; i++) {
    result += letters[Math.floor(Math.random() * letters.length)];
  }
  for (let i = 0; i < 3; i++) {
    result += numbers[Math.floor(Math.random() * numbers.length)];
  }
  return result;
};

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const addToWishlist = (product: Product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    if (!exists) {
      setWishlist((prev) => [...prev, product]);
    }
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const moveWishlistToCart = (product: Product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const checkout = () => {
    if (cart.length === 0) return;

    const newTransaction: HistoryItem = {
      id: generateTransactionId(),
      items: cart,
      total: totalPrice,
    };

    setHistory((prev) => [newTransaction, ...prev]);
    setCart([]);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        wishlist,
        cart,
        history,
        darkMode,
        addToWishlist,
        removeFromWishlist,
        addToCart,
        moveWishlistToCart,
        increaseQty,
        decreaseQty,
        checkout,
        toggleDarkMode,
        cartCount,
        totalPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used inside ShopProvider");
  }
  return context;
};


export default ShopContext;