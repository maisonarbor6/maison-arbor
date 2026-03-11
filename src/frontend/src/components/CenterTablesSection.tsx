import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAddToCart } from "../hooks/useQueries";

interface FurnitureItem {
  id: bigint;
  name: string;
  price: string;
  priceRaw: number;
  description: string;
  image: string;
}

const CENTER_TABLES: FurnitureItem[] = [
  {
    id: 101n,
    name: "Aria Marble Center Table",
    price: "\u20b985,000",
    priceRaw: 85000,
    description:
      "Handcrafted Italian marble top with brushed brass legs. A statement piece that anchors any living room with quiet confidence.",
    image: "/assets/generated/center-table-1.dim_800x600.jpg",
  },
  {
    id: 102n,
    name: "Endo Round Coffee Table",
    price: "\u20b962,000",
    priceRaw: 62000,
    description:
      "Solid walnut with a hand-oiled finish and geometric base. Clean proportions, warm materiality.",
    image: "/assets/generated/center-table-2.dim_800x600.jpg",
  },
  {
    id: 103n,
    name: "Crest Nesting Tables",
    price: "\u20b948,000",
    priceRaw: 48000,
    description:
      "Set of two travertine-topped tables with oxidised iron frames. Versatile and beautifully raw.",
    image: "/assets/generated/center-table-3.dim_800x600.jpg",
  },
];

function ItemCard({
  item,
  index,
  onView,
}: {
  item: FurnitureItem;
  index: number;
  onView: (item: FurnitureItem) => void;
}) {
  const { mutate: addToCart, isPending } = useAddToCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(
      { productId: item.id, quantity: 1n },
      {
        onSuccess: () => toast.success(`${item.name} added to cart`),
        onError: () => toast.error("Failed to add to cart"),
      },
    );
  };

  return (
    <motion.div
      data-ocid={`center_tables.item.${index + 1}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={() => onView(item)}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden mb-5 rounded-sm"
        style={{ aspectRatio: "4/3" }}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 transition-colors duration-200 flex items-end justify-center pb-5"
          style={{ backgroundColor: "transparent" }}
        >
          <div className="group-hover:bg-black/30 absolute inset-0 transition-colors duration-200" />
          <button
            type="button"
            data-ocid={`center_tables.add_button.${index + 1}`}
            onClick={handleAdd}
            disabled={isPending}
            className="relative opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 flex items-center gap-2 backdrop-blur-sm px-6 py-2.5 font-body text-[10px] tracking-widest uppercase"
            style={{
              backgroundColor: "oklch(94% 0.005 75)",
              color: "oklch(11% 0.01 55)",
            }}
          >
            <ShoppingBag className="w-3 h-3" />
            {isPending ? "Adding\u2026" : "Add to Cart"}
          </button>
        </div>
      </div>

      <div>
        <p
          className="font-body text-[10px] tracking-widest uppercase mb-1.5"
          style={{ color: "oklch(65% 0.008 70)" }}
        >
          Center Tables
        </p>
        <h3
          className="font-display text-xl leading-snug mb-2 product-name-hover"
          style={{ color: "oklch(94% 0.005 75)" }}
        >
          {item.name}
        </h3>
        <p
          className="font-display text-2xl"
          style={{ color: "oklch(68% 0.09 35)" }}
        >
          {item.price}
        </p>
      </div>
    </motion.div>
  );
}

function ItemModal({
  item,
  open,
  onClose,
}: {
  item: FurnitureItem | null;
  open: boolean;
  onClose: () => void;
}) {
  const { mutate: addToCart, isPending } = useAddToCart();

  if (!item) return null;

  const handleAdd = () => {
    addToCart(
      { productId: item.id, quantity: 1n },
      {
        onSuccess: () => {
          toast.success(`${item.name} added to cart`);
          onClose();
        },
        onError: () => toast.error("Failed to add to cart"),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="center_tables.modal"
        className="max-w-3xl p-0 gap-0 overflow-hidden rounded-none"
        style={{
          backgroundColor: "oklch(16% 0.012 55)",
          borderColor: "oklch(28% 0.015 55)",
        }}
      >
        <div className="grid md:grid-cols-2">
          <div
            style={{ aspectRatio: "4/3" }}
            className="overflow-hidden md:aspect-auto"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-between">
            <div>
              <DialogHeader>
                <p
                  className="font-body text-[10px] tracking-widest uppercase mb-3"
                  style={{ color: "oklch(65% 0.008 70)" }}
                >
                  Center Tables
                </p>
                <DialogTitle
                  className="font-display text-3xl leading-tight"
                  style={{ color: "oklch(94% 0.005 75)" }}
                >
                  {item.name}
                </DialogTitle>
              </DialogHeader>
              <div
                className="w-8 h-px my-5"
                style={{ backgroundColor: "oklch(28% 0.015 55)" }}
              />
              <p
                className="font-body leading-relaxed text-sm"
                style={{ color: "oklch(65% 0.008 70)" }}
              >
                {item.description}
              </p>
            </div>
            <div className="mt-8">
              <p
                className="font-display text-4xl mb-6"
                style={{ color: "oklch(68% 0.09 35)" }}
              >
                {item.price}
              </p>
              <Button
                data-ocid="center_tables.add_button"
                onClick={handleAdd}
                disabled={isPending}
                className="w-full rounded-none font-body text-xs tracking-widest uppercase h-12"
                style={{
                  backgroundColor: "oklch(68% 0.09 35)",
                  color: "oklch(11% 0.01 55)",
                }}
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

export default function CenterTablesSection() {
  const [selected, setSelected] = useState<FurnitureItem | null>(null);

  return (
    <section
      id="center-tables"
      className="py-28 px-6"
      style={{ backgroundColor: "oklch(11% 0.01 55)" }}
    >
      <div className="section-rule mb-28 -mt-4" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p
            className="font-body text-xs tracking-widest uppercase mb-3"
            style={{ color: "oklch(65% 0.008 70)" }}
          >
            Our Collection
          </p>
          <h2
            className="font-display text-4xl md:text-5xl"
            style={{ color: "oklch(94% 0.005 75)" }}
          >
            Center <em>Tables</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {CENTER_TABLES.map((item, i) => (
            <ItemCard
              key={String(item.id)}
              item={item}
              index={i}
              onView={setSelected}
            />
          ))}
        </div>
      </div>

      <ItemModal
        item={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
