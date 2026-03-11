import { motion } from "motion/react";

const pillars = [
  {
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Master Craftsmanship icon"
      >
        <path
          d="M20 4L36 12V28L20 36L4 28V12L20 4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M20 4V36M4 12L20 20L36 12"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
    title: "Master Craftsmanship",
    desc: "Every Maison Arbor piece is handcrafted by artisans with decades of experience. We refuse shortcuts — traditional joinery, hand-sanding, and artisanal finishing are non-negotiable in our atelier.",
  },
  {
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Sustainably Sourced icon"
      >
        <circle
          cx="20"
          cy="20"
          r="14"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M20 8C20 8 12 14 12 20C12 26 16 30 20 32C24 30 28 26 28 20C28 14 20 8 20 8Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path d="M20 8V32" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Sustainably Sourced",
    desc: "We partner with FSC-certified forests, ethical quarries, and responsible suppliers. Our packaging is fully compostable, and we offset 200% of our carbon footprint through verified reforestation programs.",
  },
  {
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Timeless Design icon"
      >
        <rect
          x="8"
          y="8"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path d="M8 20H32M20 8V32" stroke="currentColor" strokeWidth="1.5" />
        <circle
          cx="20"
          cy="20"
          r="4"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    ),
    title: "Timeless Design",
    desc: "Our design philosophy rejects trend-chasing in favour of enduring elegance. Drawing from Bauhaus principles, mid-century modernism, and organic modernism, every piece is conceived to be as relevant in 50 years as it is today.",
  },
];

export default function PillarsSection() {
  return (
    <section
      className="py-28 px-6"
      style={{ backgroundColor: "oklch(14% 0.012 55)" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p
            className="font-body text-xs tracking-widest uppercase mb-3"
            style={{ color: "oklch(65% 0.008 70)" }}
          >
            Why Maison Arbor
          </p>
          <h2
            className="font-display text-4xl md:text-5xl"
            style={{ color: "oklch(94% 0.005 75)" }}
          >
            Built on Three Pillars
          </h2>
        </motion.div>

        <div
          className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x"
          style={{ borderColor: "oklch(28% 0.015 55)" }}
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex flex-col items-start py-10 md:py-0 md:px-12 first:md:pl-0 last:md:pr-0"
            >
              <div className="mb-6" style={{ color: "oklch(68% 0.09 35)" }}>
                {pillar.icon}
              </div>
              <h3
                className="font-display text-2xl mb-4"
                style={{ color: "oklch(94% 0.005 75)" }}
              >
                {pillar.title}
              </h3>
              <p
                className="font-body leading-relaxed text-sm"
                style={{ color: "oklch(65% 0.008 70)" }}
              >
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
