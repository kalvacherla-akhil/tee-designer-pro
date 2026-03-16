import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

const types = ["All", "Round Neck", "Oversized", "Polo"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Products = () => {
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = typeFilter === "All" ? products : products.filter((p) => p.type === typeFilter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-20">
        <motion.h1
          className="font-display font-black text-4xl md:text-5xl text-center mb-4 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Shop Collection
        </motion.h1>
        <p className="text-center text-muted-foreground mb-10">Choose your canvas, then make it yours.</p>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                typeFilter === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const [colorIdx, setColorIdx] = useState(0);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={index}
    >
      <Link to={`/studio?product=${product.id}`}>
        <div className="group bg-surface rounded-2xl overflow-hidden hover-lift border border-transparent hover:border-accent/20">
          <div className="aspect-square flex items-center justify-center bg-muted/30 p-8 relative overflow-hidden">
            <img
              src={product.colors[colorIdx].image}
              alt={product.name}
              className="w-3/4 object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-bold text-lg text-foreground">{product.name}</h3>
              <span className="font-display font-bold text-lg text-foreground">${product.price}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{product.type} • {product.sizes.join(", ")}</p>
            <div className="flex gap-2" onClick={(e) => e.preventDefault()}>
              {product.colors.map((c, ci) => (
                <button
                  key={c.hex}
                  onClick={() => setColorIdx(ci)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    ci === colorIdx ? "border-accent scale-110" : "border-border"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Products;
