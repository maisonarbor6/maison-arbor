import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Category, type Product } from "../backend.d";
import { useAddToCart, useGetAllProducts } from "../hooks/useQueries";

const TABS = [
  { label: "All", value: "All" },
  { label: "Living Room", value: Category.LivingRoom },
  { label: "Bedroom", value: Category.Bedroom },
  { label: "Dining", value: Category.Dining },
  { label: "Outdoor", value: Category.Outdoor },
];

const CATEGORY_GRADIENT: Record<string, string> = {
  [Category.LivingRoom]:
    "linear-gradient(160deg, oklch(82% 0.07 78) 0%, oklch(74% 0.055 65) 100%)",
  [Category.Bedroom]:
    "linear-gradient(160deg, oklch(87% 0.04 305) 0%, oklch(92% 0.025 280) 100%)",
  [Category.Dining]:
    "linear-gradient(160deg, oklch(74% 0.09 52) 0%, oklch(86% 0.05 82) 100%)",
  [Category.Outdoor]:
    "linear-gradient(160deg, oklch(73% 0.08 158) 0%, oklch(83% 0.045 122) 100%)",
};

const CATEGORY_LABEL: Record<string, string> = {
  [Category.LivingRoom]: "Living Room",
  [Category.Bedroom]: "Bedroom",
  [Category.Dining]: "Dining",
  [Category.Outdoor]: "Outdoor",
};

function formatPrice(cents: bigint): string {
  const dollars = Number(cents) / 100;
  return `$${dollars.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1n,
    name: "Arcadia Lounge Chair",
    description:
      "A masterpiece of Scandinavian design, the Arcadia features hand-sewn saddle leather and a frame carved from sustainably harvested walnut. Sink into its generous proportions and feel the difference craftsmanship makes.",
    imageUrl: "",
    category: Category.LivingRoom,
    priceCents: 389500n,
  },
  {
    id: 2n,
    name: "Maison Sectional Sofa",
    description:
      "Our flagship sectional, upholstered in Belgian linen with hand-tied spring cushions and a solid oak base. Modular design adapts to any living space.",
    imageUrl: "",
    category: Category.LivingRoom,
    priceCents: 785000n,
  },
  {
    id: 3n,
    name: "Nocturne Bed Frame",
    description:
      "Low-profile platform bed with a hand-rubbed walnut headboard and solid brass hardware. Engineered for silent support and supreme aesthetics.",
    imageUrl: "",
    category: Category.Bedroom,
    priceCents: 420000n,
  },
  {
    id: 4n,
    name: "Serenity Side Table",
    description:
      "A turned-leg travertine side table with a delicate brass inlay edge. Pairs beautifully with both modern and classical interiors.",
    imageUrl: "",
    category: Category.Bedroom,
    priceCents: 125000n,
  },
  {
    id: 5n,
    name: "Harvest Dining Table",
    description:
      "A live-edge white oak dining table sealed with natural oil finish. Seats 8 comfortably, built to become a family heirloom.",
    imageUrl: "",
    category: Category.Dining,
    priceCents: 645000n,
  },
  {
    id: 6n,
    name: "Capri Dining Chair",
    description:
      "Italian-made dining chair with a sculpted beech frame and full-grain leather seat. Sold as a set of two.",
    imageUrl: "",
    category: Category.Dining,
    priceCents: 229000n,
  },
  {
    id: 7n,
    name: "Riviera Outdoor Sofa",
    description:
      "Premium teak frame with SUNBRELLA\u00ae fabric cushions in weathered stone. Engineered to withstand the elements without compromising elegance.",
    imageUrl: "",
    category: Category.Outdoor,
    priceCents: 548000n,
  },
  {
    id: 8n,
    name: "Terra Planter Set",
    description:
      "Hand-thrown terracotta planters with a matte volcanic glaze. Set of three graduated sizes, perfect for outdoor or indoor statement arrangements.",
    imageUrl: "",
    category: Category.Outdoor,
    priceCents: 89500n,
  },
];

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"];

interface ProductCardProps {
  product: Product;
  index: number;
  onView: (p: Product) => void;
}

function ProductCard({ product, index, onView }: ProductCardProps) {
  const { mutate: addToCart, isPending } = useAddToCart();
  const gradient =
    CATEGORY_GRADIENT[product.category as string] ??
    CATEGORY_GRADIENT[Category.LivingRoom];

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(
      { productId: product.id, quantity: 1n },
      {
        onSuccess: () => toast.success(`${product.name} added to cart`),
        onError: () => toast.error("Failed to add to cart"),
      },
    );
  };

  return (
    <motion.div
      data-ocid={`products.item.${index + 1}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group cursor-pointer"
      onClick={() => onView(product)}
    >
      {/* Portrait image — 3:4 editorial ratio */}
      <div
        className="relative overflow-hidden mb-5"
        style={{ aspectRatio: "3/4" }}
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            style={{ background: gradient }}
          />
        )}
        {/* Hover overlay with refined CTA */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/18 transition-colors duration-200 flex items-end justify-center pb-5">
          <button
            type="button"
            data-ocid="product.add_button"
            onClick={handleAdd}
            disabled={isPending}
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 bg-ivory/95 text-foreground px-6 py-2.5 font-body text-[10px] tracking-widest uppercase hover:bg-ivory flex items-center gap-2 backdrop-blur-sm"
          >
            <ShoppingBag className="w-3 h-3" />
            {isPending ? "Adding\u2026" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Meta — cleaner hierarchy */}
      <div>
        <p className="font-body text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">
          {CATEGORY_LABEL[product.category as string] ?? product.category}
        </p>
        <h3 className="font-display text-lg text-foreground leading-snug mb-2 product-name-hover inline-block">
          {product.name}
        </h3>
        {/* Price in Playfair — luxury pricing treatment */}
        <p className="font-display text-xl text-foreground">
          {formatPrice(product.priceCents)}
        </p>
      </div>
    </motion.div>
  );
}

function ProductModal({
  product,
  open,
  onClose,
}: {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}) {
  const { mutate: addToCart, isPending } = useAddToCart();

  if (!product) return null;
  const gradient =
    CATEGORY_GRADIENT[product.category as string] ??
    CATEGORY_GRADIENT[Category.LivingRoom];

  const handleAdd = () => {
    addToCart(
      { productId: product.id, quantity: 1n },
      {
        onSuccess: () => {
          toast.success(`${product.name} added to cart`);
          onClose();
        },
        onError: () => toast.error("Failed to add to cart"),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="product.modal"
        className="max-w-3xl p-0 gap-0 overflow-hidden rounded-none bg-card border-border"
      >
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div style={{ aspectRatio: "3/4" }} className="overflow-hidden">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full" style={{ background: gradient }} />
            )}
          </div>
          {/* Details */}
          <div className="p-8 md:p-10 flex flex-col justify-between">
            <div>
              <DialogHeader>
                <p className="font-body text-[10px] tracking-widest uppercase text-muted-foreground mb-3">
                  {CATEGORY_LABEL[product.category as string] ??
                    product.category}
                </p>
                <DialogTitle className="font-display text-3xl text-foreground leading-tight">
                  {product.name}
                </DialogTitle>
              </DialogHeader>
              <div className="w-8 h-px bg-border my-5" />
              <p className="font-body text-muted-foreground leading-relaxed text-sm">
                {product.description}
              </p>
            </div>
            <div className="mt-8">
              <p className="font-display text-4xl text-foreground mb-6">
                {formatPrice(product.priceCents)}
              </p>
              <Button
                data-ocid="product.add_button"
                onClick={handleAdd}
                disabled={isPending}
                className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-body text-xs tracking-widest uppercase h-12"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                {isPending ? "Adding to Cart\u2026" : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data: backendProducts, isLoading } = useGetAllProducts();

  const products =
    backendProducts && backendProducts.length > 0
      ? backendProducts
      : FALLBACK_PRODUCTS;

  const filtered =
    activeTab === "All"
      ? products
      : products.filter((p) => p.category === activeTab);

  return (
    <section id="curated-pieces" className="py-28 px-6 bg-background">
      {/* Full-width hairline rule */}
      <div className="section-rule mb-28 -mt-4" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-3">
            Curated Pieces
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Furniture That <em>Tells Stories</em>
          </h2>
        </motion.div>

        {/* Filter Tabs — spaced with more air */}
        <div className="flex flex-wrap gap-3 mb-14">
          {TABS.map((tab) => (
            <button
              type="button"
              key={tab.value}
              data-ocid="products.tab"
              onClick={() => setActiveTab(tab.value)}
              className={`font-body text-[11px] tracking-widest uppercase px-6 py-3 transition-all duration-200 border ${
                activeTab === tab.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {SKELETON_KEYS.map((key) => (
              <div key={key} className="space-y-4">
                <Skeleton className="w-full" style={{ aspectRatio: "3/4" }} />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-14"
            >
              {filtered.map((product, i) => (
                <ProductCard
                  key={String(product.id)}
                  product={product}
                  index={i}
                  onView={setSelectedProduct}
                />
              ))}
              {filtered.length === 0 && (
                <div
                  data-ocid="products.empty_state"
                  className="col-span-full py-20 text-center text-muted-foreground font-body"
                >
                  No products in this category yet.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
