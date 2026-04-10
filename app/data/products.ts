export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    price: 109000,
    image: require("../../assets/images/products/product1.jpg"),
  },
  {
    id: 2,
    name: "Product 2",
    price: 200000,
    image: require("../../assets/images/products/product2.jpg"),
  },
  {
    id: 3,
    name: "Product 3",
    price: 70000,
    image: require("../../assets/images/products/product3.jpg"),
  },
  {
    id: 4,
    name: "Product 4",
    price: 25000,
    image: require("../../assets/images/products/product4.jpg"),
  },
  {
    id: 5,
    name: "Product 5",
    price: 50000,
    image: require("../../assets/images/products/product5.jpg"),
  },
  {
    id: 6,
    name: "Product 6",
    price: 128000,
    image: require("../../assets/images/products/product6.jpg"),
  },
];