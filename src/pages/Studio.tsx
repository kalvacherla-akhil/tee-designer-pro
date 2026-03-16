import { useEffect, useRef, useState, useCallback } from "react";
import { fabric } from "fabric";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Type, Upload, Undo2, Redo2, ZoomIn, ZoomOut, Download, Trash2, ShoppingCart,
  RotateCcw, Square, Circle, Triangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { products } from "@/data/products";
import { useCart } from "@/store/cartStore";
import { toast } from "sonner";

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 600;

const Studio = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const productId = searchParams.get("product") || products[0].id;
  const product = products.find((p) => p.id === productId) || products[0];

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2] || product.sizes[0]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [zoom, setZoom] = useState(1);

  const saveHistory = useCallback(() => {
    if (!fabricRef.current) return;
    const json = JSON.stringify(fabricRef.current.toJSON());
    setHistory((prev) => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(json);
      return newHistory;
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      backgroundColor: "transparent",
      selection: true,
    });
    fabricRef.current = canvas;

    canvas.on("object:modified", saveHistory);
    canvas.on("object:added", saveHistory);

    return () => {
      canvas.dispose();
    };
  }, []);

  const addText = () => {
    const text = new fabric.IText("Your Text", {
      left: 150,
      top: 250,
      fontSize: 32,
      fontFamily: "Archivo",
      fill: "#000000",
      fontWeight: "bold",
    });
    fabricRef.current?.add(text);
    fabricRef.current?.setActiveObject(text);
  };

  const addShape = (type: "rect" | "circle" | "triangle") => {
    let shape: fabric.Object;
    const opts = { left: 180, top: 220, fill: "#3B82F6", opacity: 0.8 };
    if (type === "rect") shape = new fabric.Rect({ ...opts, width: 100, height: 100 });
    else if (type === "circle") shape = new fabric.Circle({ ...opts, radius: 50 });
    else shape = new fabric.Triangle({ ...opts, width: 100, height: 100 });
    fabricRef.current?.add(shape);
    fabricRef.current?.setActiveObject(shape);
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      fabric.Image.fromURL(event.target?.result as string, (img) => {
        img.scaleToWidth(200);
        img.set({ left: 150, top: 200 });
        fabricRef.current?.add(img);
        fabricRef.current?.setActiveObject(img);
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const undo = () => {
    if (historyIndex <= 0) return;
    const newIndex = historyIndex - 1;
    fabricRef.current?.loadFromJSON(JSON.parse(history[newIndex]), () => {
      fabricRef.current?.renderAll();
      setHistoryIndex(newIndex);
    });
  };

  const redo = () => {
    if (historyIndex >= history.length - 1) return;
    const newIndex = historyIndex + 1;
    fabricRef.current?.loadFromJSON(JSON.parse(history[newIndex]), () => {
      fabricRef.current?.renderAll();
      setHistoryIndex(newIndex);
    });
  };

  const deleteSelected = () => {
    const active = fabricRef.current?.getActiveObject();
    if (active) {
      fabricRef.current?.remove(active);
      saveHistory();
    }
  };

  const handleZoom = (dir: "in" | "out") => {
    const newZoom = dir === "in" ? Math.min(zoom + 0.1, 2) : Math.max(zoom - 0.1, 0.5);
    setZoom(newZoom);
    fabricRef.current?.setZoom(newZoom);
  };

  const downloadDesign = () => {
    if (!fabricRef.current) return;
    const dataURL = fabricRef.current.toDataURL({ format: "png", multiplier: 2 });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "my-design.png";
    link.click();
  };

  const clearCanvas = () => {
    fabricRef.current?.clear();
    fabricRef.current?.setBackgroundColor("transparent", () => {});
    fabricRef.current?.renderAll();
    saveHistory();
  };

  const addToCart = () => {
    const designImage = fabricRef.current?.toDataURL({ format: "png", multiplier: 1 });
    addItem({
      id: `${product.id}-${selectedColorIdx}-${selectedSize}-${Date.now()}`,
      name: product.name,
      color: product.colors[selectedColorIdx].name,
      size: selectedSize,
      price: product.price,
      quantity: 1,
      designImage,
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={uploadImage} />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.h1
          className="font-display font-black text-3xl md:text-4xl text-center mb-8 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Design Studio
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Toolbar */}
          <motion.div
            className="glass-panel rounded-2xl p-4 flex lg:flex-col gap-2 flex-wrap lg:w-auto w-full"
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
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              {/* T-shirt background image */}
              <img
                src={product.colors[selectedColorIdx].image}
                alt={product.name}
                className="w-[500px] h-[600px] object-contain pointer-events-none select-none"
              />
              {/* Canvas overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="mt-[-20px]" style={{ width: 220, height: 260 }}>
                  <canvas
                    ref={canvasRef}
                    className="border border-dashed border-accent/30 rounded-lg"
                    style={{
                      width: 220,
                      height: 260,
                      transform: `scale(${zoom})`,
                      transformOrigin: "center center",
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Options Panel */}
          <motion.div
            className="glass-panel rounded-2xl p-6 w-full lg:w-72 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">Product</h3>
              <p className="font-display font-bold text-foreground">{product.name}</p>
              <p className="text-2xl font-display font-black text-foreground mt-1">${product.price}</p>
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
