import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section
      className="relative w-full h-screen min-h-[640px] flex items-end overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-living-room.dim_1600x900.jpg')",
        }}
      />
      {/* Layered dark overlay — heavier at bottom for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      {/* Content — anchored bottom-left, editorial layout */}
      <div className="relative z-10 w-full px-8 md:px-14 lg:px-20 pb-16 md:pb-20">
        {/* Eyebrow row */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-5 mb-6"
        >
          <div
            className="w-8 h-px"
            style={{ backgroundColor: "oklch(97.5% 0.008 75 / 0.5)" }}
          />
          <p
            className="font-body text-[11px] tracking-widest uppercase"
            style={{ color: "oklch(97.5% 0.008 75 / 0.6)" }}
          >
            Est. 2024 &mdash; Maison Arbor
          </p>
        </motion.div>

        {/* Main headline block */}
        <div className="overflow-hidden mb-2">
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-normal leading-none"
            style={{
              fontSize: "clamp(2rem, 5.5vw, 5rem)",
              letterSpacing: "-0.01em",
              color: "oklch(97.5% 0.008 75 / 0.9)",
            }}
          >
            Rooted in
          </motion.p>
        </div>

        <div className="overflow-hidden mb-10">
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display italic hero-headline-scale"
            style={{ color: "oklch(97.5% 0.008 75)" }}
          >
            Excellence.
          </motion.p>
        </div>

        {/* Animated rule */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.85, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md h-px mb-10"
          style={{
            backgroundColor: "oklch(97.5% 0.008 75 / 0.2)",
            transformOrigin: "left",
          }}
        />

        {/* Subtitle + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-end gap-8"
        >
          <p
            className="font-body text-base md:text-lg leading-relaxed max-w-sm"
            style={{ color: "oklch(97.5% 0.008 75 / 0.7)" }}
          >
            Furniture crafted for those who appreciate
            <br className="hidden md:block" /> the art of living.
          </p>

          <a
            href="#center-tables"
            data-ocid="hero.primary_button"
            className="group inline-flex items-center gap-4 font-body text-xs tracking-widest uppercase px-8 py-4 transition-all duration-400 shrink-0"
            style={{
              border: "1px solid oklch(97.5% 0.008 75 / 0.5)",
              color: "oklch(97.5% 0.008 75)",
            }}
          >
            Explore Collections
            <span className="w-4 h-px bg-current transition-all duration-300 group-hover:w-8" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator — bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 right-10 flex flex-col items-center gap-3"
        style={{ color: "oklch(97.5% 0.008 75 / 0.4)" }}
      >
        <span
          className="font-body text-[9px] tracking-widest uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px"
          style={{ backgroundColor: "oklch(97.5% 0.008 75 / 0.3)" }}
          initial={{ height: 0 }}
          animate={{ height: 48 }}
          transition={{
            delay: 1.8,
            duration: 1,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            repeatDelay: 0.8,
          }}
        />
      </motion.div>
    </section>
  );
}
