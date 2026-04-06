import { useEffect, useRef, useState, useCallback } from "react";
import { fabric } from "fabric";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Type, Upload, Undo2, Redo2, ZoomIn, ZoomOut, Download, Trash2, ShoppingCart,
  RotateCcw, Square, Circle, Triangle, FlipHorizontal2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { products } from "@/data/products";
import { useCart } from "@/store/cartStore";
import { toast } from "sonner";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CANVAS_WIDTH = 310;
const CANVAS_HEIGHT = 500;
  

type Side = "front" | "back";

const Studio = () => {
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);
  const backCanvasRef = useRef<HTMLCanvasElement>(null);
  const frontFabricRef = useRef<fabric.Canvas | null>(null);
  const backFabricRef = useRef<fabric.Canvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const studioRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const productId = searchParams.get("product") || products[0].id;
  const product = products.find((p) => p.id === productId) || products[0];

  const [activeSide, setActiveSide] = useState<Side>("front");
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2] || product.sizes[0]);
  const [frontHistory, setFrontHistory] = useState<string[]>([]);
  const [frontHistoryIdx, setFrontHistoryIdx] = useState(-1);
  const [backHistory, setBackHistory] = useState<string[]>([]);
  const [backHistoryIdx, setBackHistoryIdx] = useState(-1);
  const [zoom, setZoom] = useState(1);

  const getActiveCanvas = () => activeSide === "front" ? frontFabricRef.current : backFabricRef.current;
  const getHistory = () => activeSide === "front" ? { history: frontHistory, index: frontHistoryIdx, setHistory: setFrontHistory, setIndex: setFrontHistoryIdx } : { history: backHistory, index: backHistoryIdx, setHistory: setBackHistory, setIndex: setBackHistoryIdx };

  const saveHistory = useCallback(() => {
    const canvas = getActiveCanvas();
    if (!canvas) return;
    const json = JSON.stringify(canvas.toJSON());
    const h = getHistory();
    h.setHistory((prev) => {
      const newH = prev.slice(0, h.index + 1);
      newH.push(json);
      return newH;
    });
    h.setIndex((prev) => prev + 1);
  }, [activeSide, frontHistoryIdx, backHistoryIdx]);

  const initCanvas = (ref: React.RefObject<HTMLCanvasElement>, fabricRef: React.MutableRefObject<fabric.Canvas | null>) => {
    if (!ref.current || fabricRef.current) return;
    const canvas = new fabric.Canvas(ref.current, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      backgroundColor: "transparent",
      selection: true,
    });
    fabricRef.current = canvas;
    canvas.on("object:modified", saveHistory);
    canvas.on("object:added", saveHistory);
  };

  useEffect(() => {
    initCanvas(frontCanvasRef, frontFabricRef);
    initCanvas(backCanvasRef, backFabricRef);
    
    // GSAP animations for Studio
    if (studioRef.current) {
      gsap.fromTo(studioRef.current.querySelector(".studio-title"), 
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      
      gsap.fromTo(studioRef.current.querySelector(".toolbar"), 
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
      );
      
      gsap.fromTo(studioRef.current.querySelector(".canvas-area"), 
        { opacity: 0, scale: 0.9, y: 60 },
        { opacity: 1, scale: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
      );
      
      gsap.fromTo(studioRef.current.querySelector(".options-panel"), 
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.7, ease: "power3.out" }
      );
    }
    
    return () => {
      frontFabricRef.current?.dispose();
      backFabricRef.current?.dispose();
    };
  }, []);

  const addText = () => {
    const canvas = getActiveCanvas();
    const text = new fabric.IText("Your Text", {
      left: 150, top: 250, fontSize: 32, fontFamily: "Archivo", fill: "#000000", fontWeight: "bold",
    });
    canvas?.add(text);
    canvas?.setActiveObject(text);
  };

  const addShape = (type: "rect" | "circle" | "triangle") => {
    const canvas = getActiveCanvas();
    let shape: fabric.Object;
    const opts = { left: 180, top: 220, fill: "#3B82F6", opacity: 0.8 };
    if (type === "rect") shape = new fabric.Rect({ ...opts, width: 100, height: 100 });
    else if (type === "circle") shape = new fabric.Circle({ ...opts, radius: 50 });
    else shape = new fabric.Triangle({ ...opts, width: 100, height: 100 });
    canvas?.add(shape);
    canvas?.setActiveObject(shape);
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      fabric.Image.fromURL(event.target?.result as string, (img) => {
        img.scaleToWidth(200);
        img.set({ left: 150, top: 200 });
        const canvas = getActiveCanvas();
        canvas?.add(img);
        canvas?.setActiveObject(img);
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const undo = () => {
    const canvas = getActiveCanvas();
    const h = getHistory();
    if (h.index <= 0) return;
    const newIndex = h.index - 1;
    canvas?.loadFromJSON(JSON.parse(h.history[newIndex]), () => {
      canvas?.renderAll();
      h.setIndex(newIndex);
    });
  };

  const redo = () => {
    const canvas = getActiveCanvas();
    const h = getHistory();
    if (h.index >= h.history.length - 1) return;
    const newIndex = h.index + 1;
    canvas?.loadFromJSON(JSON.parse(h.history[newIndex]), () => {
      canvas?.renderAll();
      h.setIndex(newIndex);
    });
  };

  const deleteSelected = () => {
    const canvas = getActiveCanvas();
    const active = canvas?.getActiveObject();
    if (active) {
      canvas?.remove(active);
      saveHistory();
    }
  };

  const handleZoom = (dir: "in" | "out") => {
    const newZoom = dir === "in" ? Math.min(zoom + 0.1, 2) : Math.max(zoom - 0.1, 0.5);
    setZoom(newZoom);
    getActiveCanvas()?.setZoom(newZoom);
  };

  const downloadDesign = () => {
    const canvas = getActiveCanvas();
    if (!canvas) return;
    const dataURL = canvas.toDataURL({ format: "png", multiplier: 2 });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `my-design-${activeSide}.png`;
    link.click();
  };

  const clearCanvas = () => {
    const canvas = getActiveCanvas();
    canvas?.clear();
    canvas?.setBackgroundColor("transparent", () => {});
    canvas?.renderAll();
    saveHistory();
  };

  const addToCart = () => {
    const frontImage = frontFabricRef.current?.toDataURL({ format: "png", multiplier: 1 });
    const backImage = backFabricRef.current?.toDataURL({ format: "png", multiplier: 1 });
    addItem({
      id: `${product.id}-${selectedColorIdx}-${selectedSize}-${Date.now()}`,
      name: product.name,
      color: product.colors[selectedColorIdx].name,
      size: selectedSize,
      price: product.price,
      quantity: 1,
      designImage: frontImage,
      backDesignImage: backImage,
    });
    toast.success("Added to cart!");
  };

  const tools = [
    { icon: <Type className="w-4 h-4" />, label: "Text", action: addText },
    { icon: <Upload className="w-4 h-4" />, label: "Image", action: () => fileInputRef.current?.click() },
    { icon: <Square className="w-4 h-4" />, label: "Rect", action: () => addShape("rect") },
    { icon: <Circle className="w-4 h-4" />, label: "Circle", action: () => addShape("circle") },
    { icon: <Triangle className="w-4 h-4" />, label: "Triangle", action: () => addShape("triangle") },
    { icon: <Trash2 className="w-4 h-4" />, label: "Delete", action: deleteSelected },
    { icon: <Undo2 className="w-4 h-4" />, label: "Undo", action: undo },
    { icon: <Redo2 className="w-4 h-4" />, label: "Redo", action: redo },
    { icon: <ZoomIn className="w-4 h-4" />, label: "Zoom+", action: () => handleZoom("in") },
    { icon: <ZoomOut className="w-4 h-4" />, label: "Zoom−", action: () => handleZoom("out") },
    { icon: <RotateCcw className="w-4 h-4" />, label: "Clear", action: clearCanvas },
    { icon: <Download className="w-4 h-4" />, label: "Save", action: downloadDesign },
  ];

  return (
    <div ref={studioRef} className="min-h-screen bg-background">
      <Navbar />
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={uploadImage} />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.h1
          className="studio-title font-display font-black text-3xl md:text-4xl text-center mb-8 text-foreground text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Design Studio
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Toolbar */}
          <motion.div
            className="toolbar glass-panel rounded-2xl p-4 flex lg:flex-col gap-2 flex-wrap lg:w-auto w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {tools.map((tool) => (
              <button
                key={tool.label}
                onClick={tool.action}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                title={tool.label}
              >
                {tool.icon}
                <span className="lg:inline hidden">{tool.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Canvas Area */}
          <motion.div
            className="canvas-area flex-1 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              {/* T-shirt background image */}
              <img
                src={product.colors[selectedColorIdx].image}
                alt={product.name}
                className={`w-[600px] h-[700px] object-contain pointer-events-none select-none transition-transform duration-500 ${activeSide === "back" ? "scale-x-[-1]" : ""}`}
                style={{ marginTop: '-40px' }}
              />
              {/* Canvas overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative" style={{ width: 300, height: 360, marginTop: '-120px' }}>
                  {/* Front/Back Toggle Buttons inside canvas area */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {(["front", "back"] as Side[]).map((side) => (
                      <button
                        key={side}
                        onClick={() => setActiveSide(side)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                          activeSide === side
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-muted"
                        }`}
                      >
                        {side === "back" && <FlipHorizontal2 className="w-3 h-3" />}
                        {side.charAt(0).toUpperCase() + side.slice(1)}
                      </button>
                    ))}
                  </div>
                  {/* Front canvas */}
                  <canvas
                    ref={frontCanvasRef}
                    className="border border-dashed border-accent/30 rounded-lg"
                    style={{
                      width: 300,
                      height: 360,
                      transform: `scale(${zoom})`,
                      transformOrigin: "center center",
                      display: activeSide === "front" ? "block" : "none",
                    }}
                  />
                  {/* Back canvas */}
                  <canvas
                    ref={backCanvasRef}
                    className="border border-dashed border-accent/30 rounded-lg"
                    style={{
                      width: 300,
                      height: 360,
                      transform: `scale(${zoom})`,
                      transformOrigin: "center center",
                      display: activeSide === "back" ? "block" : "none",
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Options Panel */}
          <motion.div
            className="options-panel glass-panel rounded-2xl p-6 w-full lg:w-72 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">Product</h3>
              <p className="font-display font-bold text-foreground">{product.name}</p>
              <p className="text-2xl font-display font-black text-foreground mt-1">₹{product.price}</p>
            </div>

            <div>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((c, i) => (
                  <button
                    key={c.hex}
                    onClick={() => setSelectedColorIdx(i)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      i === selectedColorIdx ? "border-accent scale-110 shadow-md" : "border-border"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      s === selectedSize
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-muted"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <Button variant="hero" size="lg" className="w-full" onClick={addToCart}>
              <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Studio;
