import { motion } from "motion/react";

const collections = [
  {
    id: 1,
    title: "Center Tables",
    items: "3 Pieces",
    image: "/assets/generated/center-table-1.dim_800x600.jpg",
    href: "#center-tables",
  },
  {
    id: 2,
    title: "TV Bottoms",
    items: "3 Pieces",
    image: "/assets/generated/tv-bottom-1.dim_800x600.jpg",
    href: "#tv-bottoms",
  },
];

export default function CollectionsSection() {
  return (
    <section
      id="collections"
      className="py-28 px-6"
      style={{ backgroundColor: "oklch(16% 0.012 55)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <p
              className="font-body text-xs tracking-widest uppercase mb-3"
              style={{ color: "oklch(65% 0.008 70)" }}
            >
              Our Collections
            </p>
            <h2
              className="font-display text-4xl md:text-5xl"
              style={{ color: "oklch(94% 0.005 75)" }}
            >
              Curated Spaces,
              <br />
              <em>Timeless Stories</em>
            </h2>
          </div>
          <div
            className="hidden md:block w-24 h-px"
            style={{ backgroundColor: "oklch(28% 0.015 55)" }}
          />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((col, i) => (
            <motion.a
              key={col.id}
              href={col.href}
              data-ocid={`collections.item.${col.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden cursor-pointer block"
              style={{ aspectRatio: "16/9" }}
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${col.image}')` }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p
                  className="font-body text-xs tracking-widest uppercase mb-1"
                  style={{ color: "oklch(94% 0.005 75 / 0.55)" }}
                >
                  {col.items}
                </p>
                <h3
                  className="font-display text-3xl"
                  style={{ color: "oklch(94% 0.005 75)" }}
                >
                  {col.title}
                </h3>
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className="font-body text-xs tracking-wider uppercase"
                    style={{ color: "oklch(94% 0.005 75 / 0.65)" }}
                  >
                    Explore
                  </span>
                  <div
                    className="h-px w-6 transition-all duration-300 group-hover:w-12"
                    style={{ backgroundColor: "oklch(94% 0.005 75 / 0.5)" }}
                  />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
