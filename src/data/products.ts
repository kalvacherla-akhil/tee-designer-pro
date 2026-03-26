import tshirtWhite from "@/assets/tshirt-white.png";
import tshirtBlack from "@/assets/tshirt-black.png";
import tshirtNavy from "@/assets/tshirt-navy.png";
import tshirtRed from "@/assets/tshirt-red.png";
import walletWhite from "@/assets/wallet-white.png";
import walletBlack from "@/assets/wallet-black.png";
import mousepadWhite from "@/assets/mousepad-white.png";
import mousepadBlack from "@/assets/mousepad-black.png";
import hankyWhite from "@/assets/hanky-white.png";
import hankyNavy from "@/assets/hanky-navy.png";

export interface Product {
  id: string;
  name: string;
  type: string;
  category: string;
  price: number;
  colors: { name: string; hex: string; image: string }[];
  sizes: string[];
}

export const categories = ["All", "T-Shirt", "Wallet", "Mouse Pad", "Handkerchief"];

export const products: Product[] = [
  {
    id: "classic-crew",
    name: "Classic Crew Neck",
    type: "Round Neck",
    category: "T-Shirt",
    price: 799,
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
    category: "T-Shirt",
    price: 1199,
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
    category: "T-Shirt",
    price: 1399,
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
    category: "T-Shirt",
    price: 599,
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
    category: "T-Shirt",
    price: 999,
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
    category: "T-Shirt",
    price: 1499,
    colors: [
      { name: "White", hex: "#FFFFFF", image: tshirtWhite },
      { name: "Navy", hex: "#1E3A5F", image: tshirtNavy },
      { name: "Red", hex: "#EF4444", image: tshirtRed },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  // Wallets
  {
    id: "classic-wallet",
    name: "Classic Wallet",
    type: "Bi-fold",
    category: "Wallet",
    price: 499,
    colors: [
      { name: "White", hex: "#FFFFFF", image: walletWhite },
      { name: "Black", hex: "#000000", image: walletBlack },
    ],
    sizes: ["One Size"],
  },
  {
    id: "premium-wallet",
    name: "Premium Wallet",
    type: "Slim",
    category: "Wallet",
    price: 699,
    colors: [
      { name: "Black", hex: "#000000", image: walletBlack },
      { name: "White", hex: "#FFFFFF", image: walletWhite },
    ],
    sizes: ["One Size"],
  },
  // Mouse Pads
  {
    id: "gaming-mousepad",
    name: "Gaming Mouse Pad",
    type: "Extended",
    category: "Mouse Pad",
    price: 399,
    colors: [
      { name: "Black", hex: "#000000", image: mousepadBlack },
      { name: "White", hex: "#FFFFFF", image: mousepadWhite },
    ],
    sizes: ["Standard", "Large"],
  },
  {
    id: "desk-mousepad",
    name: "Desk Mouse Pad",
    type: "Standard",
    category: "Mouse Pad",
    price: 299,
    colors: [
      { name: "White", hex: "#FFFFFF", image: mousepadWhite },
      { name: "Black", hex: "#000000", image: mousepadBlack },
    ],
    sizes: ["Standard"],
  },
  // Handkerchiefs
  {
    id: "silk-handkerchief",
    name: "Silk Handkerchief",
    type: "Premium",
    category: "Handkerchief",
    price: 349,
    colors: [
      { name: "White", hex: "#FFFFFF", image: hankyWhite },
      { name: "Navy", hex: "#1E3A5F", image: hankyNavy },
    ],
    sizes: ["One Size"],
  },
  {
    id: "cotton-handkerchief",
    name: "Cotton Handkerchief",
    type: "Classic",
    category: "Handkerchief",
    price: 199,
    colors: [
      { name: "White", hex: "#FFFFFF", image: hankyWhite },
      { name: "Navy", hex: "#1E3A5F", image: hankyNavy },
    ],
    sizes: ["One Size"],
  },
];
