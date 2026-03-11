import { Star } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
  {
    id: 1,
    name: "Isabelle Laurent",
    location: "Paris, France",
    quote:
      "Our Harvest Dining Table has become the centrepiece of our home — conversation starter at every dinner party. The craftsmanship is extraordinary; you can feel the care in every detail.",
  },
  {
    id: 2,
    name: "James Whitmore",
    location: "London, UK",
    quote:
      "I've furnished three homes over the years and nothing has matched the quality of Maison Arbor. The Nocturne Bed Frame arrived impeccably packaged and looks even more beautiful in person.",
  },
  {
    id: 3,
    name: "Sofia Hernandez",
    location: "New York, USA",
    quote:
      "The Arcadia Lounge Chair changed how I experience my living room. It's the first thing guests comment on, and the most comfortable piece of furniture I've ever owned.",
  },
];

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

export default function TestimonialsSection() {
  return (
    <section
      className="py-28 px-6"
      style={{ backgroundColor: "oklch(11% 0.01 55)" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p
            className="font-body text-xs tracking-widest uppercase mb-3"
            style={{ color: "oklch(65% 0.008 70)" }}
          >
            Client Stories
          </p>
          <h2
            className="font-display text-4xl md:text-5xl"
            style={{ color: "oklch(94% 0.005 75)" }}
          >
            Voices of Excellence
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="p-8 flex flex-col gap-6"
              style={{
                backgroundColor: "oklch(16% 0.012 55)",
                border: "1px solid oklch(28% 0.015 55)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {STAR_KEYS.map((key) => (
                  <Star
                    key={key}
                    className="w-3.5 h-3.5"
                    style={{
                      fill: "oklch(68% 0.09 35)",
                      color: "oklch(68% 0.09 35)",
                    }}
                  />
                ))}
              </div>
              {/* Quote */}
              <p
                className="font-body leading-relaxed text-sm flex-1"
                style={{ color: "oklch(80% 0.006 72)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              {/* Author */}
              <div>
                <div
                  className="w-8 h-px mb-3"
                  style={{ backgroundColor: "oklch(28% 0.015 55)" }}
                />
                <p
                  className="font-display text-base"
                  style={{ color: "oklch(94% 0.005 75)" }}
                >
                  {t.name}
                </p>
                <p
                  className="font-body text-xs tracking-wider uppercase"
                  style={{ color: "oklch(65% 0.008 70)" }}
                >
                  {t.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
