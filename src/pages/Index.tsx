import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Package, Truck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import tshirtBlack from "@/assets/tshirt-black.png";
import { products } from "@/data/products";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { 
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop&crop=center",
    title: "Choose Your Tee", 
    desc: "Pick from our premium collection of styles and colors." 
  },
  { 
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57c2a?w=400&h=300&fit=crop&crop=center",
    title: "Design It", 
    desc: "Use our powerful studio to add text, images, and artwork." 
  },
  { 
    image: "https://images.unsplash.com/photo-1605639691513-f84b9b8946cf?w=400&h=300&fit=crop&crop=center",
    title: "We Deliver", 
    desc: "Printed with care and shipped straight to your door." 
  },
];

const reviews = [
  { name: "Alex M.", text: "The quality blew me away. My custom design looks exactly like the preview!", rating: 5 },
  { name: "Sarah K.", text: "So easy to use! Had my shirt designed and ordered in under 10 minutes.", rating: 5 },
  { name: "James L.", text: "Best custom tee service I've used. The fabric is premium and printing is perfect.", rating: 5 },
  { name: "Mia R.", text: "Love the studio editor — it's like Photoshop but way simpler. Great product!", rating: 4 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

const Index = () => {
  const [reviewIndex, setReviewIndex] = useState(0);
  const [selectedColors, setSelectedColors] = useState<{[key: string]: number}>({});
  const popularProducts = products.slice(0, 4);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero section animations
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.querySelector(".hero-title"), 
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      
      gsap.fromTo(heroRef.current.querySelector(".hero-subtitle"), 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
      );
      
      gsap.fromTo(heroRef.current.querySelector(".hero-buttons"), 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: "power3.out" }
      );
    }

    // Steps section animations
    if (stepsRef.current) {
      const steps = stepsRef.current.querySelectorAll(".step-card");
      gsap.fromTo(steps,
        { opacity: 0, y: 60, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 80%"
          }
        }
      );
    }

    // Popular products animations
    if (popularRef.current) {
      const cards = popularRef.current.querySelectorAll(".product-card");
      gsap.fromTo(cards,
        { opacity: 0, y: 80, rotationY: 15 },
        { 
          opacity: 1, 
          y: 0, 
          rotationY: 0, 
          duration: 1, 
          stagger: 0.15, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: popularRef.current,
            start: "top 80%"
          }
        }
      );
    }

    // Reviews section animations
    if (reviewsRef.current) {
      gsap.fromTo(reviewsRef.current.querySelector(".review-card"), 
        { opacity: 0, x: -100 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: reviewsRef.current,
            start: "top 80%"
          }
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="hero-title font-display font-black text-5xl md:text-7xl leading-[1.05] tracking-tight text-foreground">
              Design Your<br />
              Own Custom<br />
              <span className="text-accent">T-Shirt</span>
            </h1>
            <p className="hero-subtitle mt-6 text-lg text-muted-foreground max-w-md">
              From idea to doorstep. Create unique, high-quality custom tees with our powerful design studio.
            </p>
            <div className="hero-buttons mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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
      <section ref={stepsRef} className="py-20 bg-surface">
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
                className="step-card text-center p-8 rounded-2xl bg-background hover-lift"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
              >
                <div className="w-full h-32 rounded-xl overflow-hidden mb-5">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display font-bold text-lg mb-2 text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Designs */}
      <section ref={popularRef} className="py-20">
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
                className="product-card"
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
                        src={product.colors[selectedColors[product.id] || 0].image}
                        alt={product.name}
                        className="w-3/4 object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="font-display font-bold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.type}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-display font-bold text-lg text-foreground">₹{product.price}</span>
                      <div className="flex gap-1">
                        {product.colors.map((c, idx) => (
                          <button
                            key={c.hex}
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedColors(prev => ({...prev, [product.id]: idx}));
                            }}
                            className={`w-4 h-4 rounded-full border transition-all ${
                              selectedColors[product.id] === idx ? "border-accent scale-110" : "border-border"
                            }`}
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
      <section ref={reviewsRef} className="py-20 bg-surface">
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
            className="review-card bg-background rounded-2xl p-8 md:p-12 text-center"
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
