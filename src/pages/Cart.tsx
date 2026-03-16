import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useCart } from "@/store/cartStore";

const Cart = () => {
  const { items, updateQuantity, removeItem, total } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-20 max-w-3xl">
        <motion.h1
          className="font-display font-black text-4xl text-center mb-10 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Your Cart
        </motion.h1>

        {items.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-lg text-muted-foreground mb-6">Your cart is empty</p>
            <Link to="/products">
              <Button variant="hero" size="lg">Browse Collection</Button>
            </Link>
          </motion.div>
        ) : (
          <>
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex items-center gap-6 bg-surface rounded-2xl p-5 mb-4"
                >
                  {item.designImage && (
                    <img src={item.designImage} alt="Design" className="w-20 h-20 rounded-lg object-contain bg-muted/30" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.color} • {item.size}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5 text-foreground" />
                    </button>
                    <motion.span
                      key={item.quantity}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      className="w-8 text-center font-display font-bold text-foreground"
                    >
                      {item.quantity}
                    </motion.span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-foreground" />
                    </button>
                  </div>
                  <motion.span
                    key={item.price * item.quantity}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="font-display font-bold text-lg w-20 text-right text-foreground"
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </motion.span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="border-t border-border mt-8 pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg text-muted-foreground">Total</span>
                <motion.span
                  key={total}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="font-display font-black text-3xl text-foreground"
                >
                  ${total.toFixed(2)}
                </motion.span>
              </div>
              <div className="flex gap-4">
                <Link to="/products" className="flex-1">
                  <Button variant="heroOutline" size="lg" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
                  </Button>
                </Link>
                <Button variant="hero" size="lg" className="flex-1" onClick={() => {}}>
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
