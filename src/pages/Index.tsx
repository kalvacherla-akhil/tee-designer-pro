import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Package, Truck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import tshirtBlack from "@/assets/tshirt-black.png";
import { products } from "@/data/products";
import { useState } from "react";

const steps = [
  { icon: <Package className="w-6 h-6" />, title: "Choose Your Tee", desc: "Pick from our premium collection of styles and colors." },
  { icon: <Palette className="w-6 h-6" />, title: "Design It", desc: "Use our powerful studio to add text, images, and artwork." },
  { icon: <Truck className="w-6 h-6" />, title: "We Deliver", desc: "Printed with care and shipped straight to your door." },
];

const reviews = [
  { name: "Alex M.", text: "The quality blew me away. My custom design looks exactly like the preview!", rating: 5 },
  { name: "Sarah K.", text: "So easy to use! Had my shirt designed and ordered in under 10 minutes.", rating: 5 },
  { name: "James L.", text: "Best custom tee service I've used. The fabric is premium and printing is perfect.", rating: 5 },
  { name: "Mia R.", text: "Love the studio editor — it's like Photoshop but way simpler. Great product!", rating: 4 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

const Index = () => {
  const [reviewIndex, setReviewIndex] = useState(0);
  const popularProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display font-black text-5xl md:text-7xl leading-[1.05] tracking-tight text-foreground">
              Design Your<br />
              Own Custom<br />
              <span className="text-accent">T-Shirt</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              From idea to doorstep. Create unique, high-quality custom tees with our powerful design studio.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/studio">
                <Button variant="hero" size="xl">
                  Start Designing <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="heroOutline" size="xl">
                  Browse Collection
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent/10 rounded-full blur-3xl scale-75" />
              <motion.img
                src={tshirtBlack}
                alt="Custom T-Shirt"
                className="relative w-80 md:w-[420px] drop-shadow-2xl"
                animate={{ y: [0, -20, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <motion.h2
            className="font-display font-bold text-3xl md:text-4xl text-center mb-16 text-foreground"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="text-center p-8 rounded-2xl bg-background hover-lift"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-5">
                  {step.icon}
                </div>
                <h3 className="font-display font-bold text-lg mb-2 text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Designs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="font-display font-bold text-3xl md:text-4xl text-center mb-4 text-foreground"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            Popular Picks
          </motion.h2>
          <p className="text-center text-muted-foreground mb-12">Our best-selling styles, ready for your creativity.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
              >
                <Link to={`/studio?product=${product.id}`}>
                  <div className="group bg-surface rounded-2xl p-6 hover-lift cursor-pointer border border-transparent hover:border-accent/20">
                    <div className="aspect-square flex items-center justify-center overflow-hidden rounded-xl bg-muted/30 mb-4">
                      <img
                        src={product.colors[0].image}
                        alt={product.name}
                        className="w-3/4 object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="font-display font-bold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.type}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-display font-bold text-lg text-foreground">${product.price}</span>
                      <div className="flex gap-1">
                        {product.colors.map((c) => (
                          <span
                            key={c.hex}
                            className="w-4 h-4 rounded-full border border-border"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h2
            className="font-display font-bold text-3xl md:text-4xl text-center mb-12 text-foreground"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            What Our Customers Say
          </motion.h2>
          <motion.div
            key={reviewIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-background rounded-2xl p-8 md:p-12 text-center"
          >
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: reviews[reviewIndex].rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-lg text-foreground mb-6 italic">"{reviews[reviewIndex].text}"</p>
            <p className="font-display font-bold text-foreground">{reviews[reviewIndex].name}</p>
          </motion.div>
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setReviewIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === reviewIndex ? "bg-accent w-8" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
