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
    price: 19000,
    image: "https://picsum.photos/200?random=1",
  },
  {
    id: 2,
    name: "Product 2",
    price: 29000,
    image: "https://picsum.photos/200?random=2",
  },
  {
    id: 3,
    name: "Product 3",
    price: 70000,
    image: "https://picsum.photos/200?random=3",
  },
  {
    id: 4,
    name: "Product 4",
    price: 25000,
    image: "https://picsum.photos/200?random=4",
  },
  {
    id: 5,
    name: "Product 5",
    price: 32000,
    image: "https://picsum.photos/200?random=5",
  },
  {
    id: 6,
    name: "Product 6",
    price: 18000,
    image: "https://picsum.photos/200?random=6",
  },
];