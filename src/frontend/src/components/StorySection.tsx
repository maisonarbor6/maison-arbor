import { motion } from "motion/react";

export default function StorySection() {
  return (
    <section
      className="relative py-32 px-6 grain-texture overflow-hidden"
      style={{
        backgroundColor: "oklch(11% 0.01 55)",
        color: "oklch(97.5% 0.008 75)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 lg:gap-32 items-center">
          {/* Left: Quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Large opening guillemet — decorative */}
            <p
              className="font-display select-none leading-none mb-[-1.5rem]"
              style={{
                fontSize: "clamp(5rem, 14vw, 12rem)",
                lineHeight: 1,
                color: "oklch(97.5% 0.008 75 / 0.08)",
              }}
              aria-hidden="true"
            >
              &ldquo;
            </p>
            <blockquote
              className="font-display text-2xl md:text-3xl lg:text-[2.6rem] leading-snug"
              style={{ color: "oklch(97.5% 0.008 75)" }}
            >
              We believe furniture is not merely functional &mdash; it is a
              statement of who you are.
            </blockquote>
            <div className="mt-10 flex items-center gap-4">
              <div
                className="w-8 h-px"
                style={{ backgroundColor: "oklch(97.5% 0.008 75 / 0.3)" }}
              />
              <p
                className="font-body text-[10px] tracking-widest uppercase"
                style={{ color: "oklch(97.5% 0.008 75 / 0.4)" }}
              >
                The Maison Arbor Philosophy
              </p>
            </div>
          </motion.div>

          {/* Right: Brand Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-7"
          >
            <p
              className="font-body leading-[1.85] text-[0.9375rem]"
              style={{ color: "oklch(97.5% 0.008 75 / 0.65)" }}
            >
              Maison Arbor was born from a deep reverence for natural materials
              and the enduring beauty of expert craftsmanship. Each piece in our
              collection tells the story of the hands that shaped it &mdash;
              master artisans who have honed their skills across generations.
            </p>
            <p
              className="font-body leading-[1.85] text-[0.9375rem]"
              style={{ color: "oklch(97.5% 0.008 75 / 0.65)" }}
            >
              We source our materials responsibly, partnering with sustainable
              forestry programs and family-run quarries. Our walnut comes from
              FSC-certified forests; our marble from small quarries in Carrara
              and Bardiglio. Nothing in a Maison Arbor piece is accidental.
            </p>
            <p
              className="font-body leading-[1.85] text-[0.9375rem]"
              style={{ color: "oklch(97.5% 0.008 75 / 0.65)" }}
            >
              We offer a 25-year craftsmanship warranty on every structural
              element &mdash; because we build furniture meant to outlast
              trends, to be passed down, and to grow more beautiful with time.
            </p>
            <div className="pt-2">
              <a
                href="#collections"
                className="group inline-flex items-center gap-3 font-body text-[10px] tracking-widest uppercase transition-colors duration-300"
                style={{ color: "oklch(97.5% 0.008 75 / 0.5)" }}
              >
                <span>Explore Our Heritage</span>
                <span className="w-6 h-px bg-current transition-all duration-300 group-hover:w-10" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
