import tshirtWhite from "@/assets/tshirt-white.png";
import tshirtBlack from "@/assets/tshirt-black.png";
import tshirtNavy from "@/assets/tshirt-navy.png";
import tshirtRed from "@/assets/tshirt-red.png";

export interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  colors: { name: string; hex: string; image: string }[];
  sizes: string[];
}

export const products: Product[] = [
  {
    id: "classic-crew",
    name: "Classic Crew Neck",
    type: "Round Neck",
    price: 29.99,
    colors: [
      { name: "White", hex: "#FFFFFF", image: tshirtWhite },
      { name: "Black", hex: "#000000", image: tshirtBlack },
      { name: "Navy", hex: "#1E3A5F", image: tshirtNavy },
      { name: "Red", hex: "#EF4444", image: tshirtRed },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: "premium-oversized",
    name: "Premium Oversized",
    type: "Oversized",
    price: 39.99,
    colors: [
      { name: "White", hex: "#FFFFFF", image: tshirtWhite },
      { name: "Black", hex: "#000000", image: tshirtBlack },
      { name: "Navy", hex: "#1E3A5F", image: tshirtNavy },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "sport-polo",
    name: "Sport Polo",
    type: "Polo",
    price: 44.99,
    colors: [
      { name: "White", hex: "#FFFFFF", image: tshirtWhite },
      { name: "Black", hex: "#000000", image: tshirtBlack },
      { name: "Red", hex: "#EF4444", image: tshirtRed },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "essential-tee",
    name: "Essential Tee",
    type: "Round Neck",
    price: 24.99,
    colors: [
      { name: "White", hex: "#FFFFFF", image: tshirtWhite },
      { name: "Black", hex: "#000000", image: tshirtBlack },
      { name: "Navy", hex: "#1E3A5F", image: tshirtNavy },
      { name: "Red", hex: "#EF4444", image: tshirtRed },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "urban-oversized",
    name: "Urban Oversized",
    type: "Oversized",
    price: 34.99,
    colors: [
      { name: "Black", hex: "#000000", image: tshirtBlack },
      { name: "Navy", hex: "#1E3A5F", image: tshirtNavy },
    ],
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: "classic-polo",
    name: "Classic Polo",
    type: "Polo",
    price: 49.99,
    colors: [
      { name: "White", hex: "#FFFFFF", image: tshirtWhite },
      { name: "Navy", hex: "#1E3A5F", image: tshirtNavy },
      { name: "Red", hex: "#EF4444", image: tshirtRed },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
];
