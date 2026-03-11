import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
    toast.success("Welcome to the Maison Arbor Circle!");
    setEmail("");
  };

  return (
    <section
      className="relative py-32 px-6 grain-texture overflow-hidden"
      style={{ backgroundColor: "oklch(11% 0.01 55)" }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Decorative mark */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div
              className="w-10 h-px"
              style={{ backgroundColor: "oklch(97.5% 0.008 75 / 0.2)" }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "oklch(97.5% 0.008 75 / 0.3)" }}
            />
            <div
              className="w-10 h-px"
              style={{ backgroundColor: "oklch(97.5% 0.008 75 / 0.2)" }}
            />
          </div>

          <h2
            className="font-display text-4xl md:text-5xl mb-5 leading-tight"
            style={{ color: "oklch(97.5% 0.008 75)" }}
          >
            Join the Maison
            <br />
            <em>Arbor Circle</em>
          </h2>
          <p
            className="font-body text-[0.9375rem] mb-12 leading-relaxed"
            style={{ color: "oklch(97.5% 0.008 75 / 0.5)" }}
          >
            Be the first to discover new collections, exclusive events, and
            design inspiration.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-6"
            >
              <p
                className="font-display text-xl"
                style={{ color: "oklch(97.5% 0.008 75 / 0.8)" }}
              >
                Thank you for joining.
              </p>
              <p
                className="font-body text-sm mt-2 tracking-wider"
                style={{ color: "oklch(97.5% 0.008 75 / 0.4)" }}
              >
                We will be in touch.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex max-w-sm mx-auto">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                data-ocid="newsletter.input"
                required
                className="flex-1 rounded-none border-r-0 font-body focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
                style={{
                  backgroundColor: "oklch(97.5% 0.008 75 / 0.08)",
                  borderColor: "oklch(97.5% 0.008 75 / 0.15)",
                  color: "oklch(97.5% 0.008 75)",
                }}
              />
              <Button
                type="submit"
                data-ocid="newsletter.submit_button"
                className="rounded-none font-body text-[10px] tracking-widest uppercase px-6 h-12 shrink-0 transition-colors duration-200"
                style={{
                  backgroundColor: "oklch(97.5% 0.008 75)",
                  color: "oklch(11% 0.01 55)",
                }}
              >
                Subscribe
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
