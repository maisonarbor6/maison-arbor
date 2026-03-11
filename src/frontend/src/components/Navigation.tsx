import { Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface NavigationProps {
  cartCount: number;
  onCartOpen: () => void;
}

const navLinks = [
  { label: "Center Tables", href: "#center-tables" },
  { label: "TV Bottoms", href: "#tv-bottoms" },
];

export default function Navigation({ cartCount, onCartOpen }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
      style={{
        backgroundColor: "oklch(11% 0.01 55 / 0.96)",
        borderColor: "oklch(28% 0.015 55)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Brand Name */}
          <a href="/" className="flex flex-col leading-none group">
            <span
              style={{ color: "oklch(97.5% 0.008 75)" }}
              className="font-display text-xl tracking-widest font-semibold"
            >
              MAISON ARBOR
            </span>
            <span
              style={{ color: "oklch(65% 0.008 70)" }}
              className="font-body text-[10px] tracking-widest uppercase"
            >
              Rooted in Excellence
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid="nav.link"
                style={{ color: "oklch(97.5% 0.008 75)" }}
                className="font-body text-sm tracking-wider uppercase transition-opacity duration-200 hover:opacity-60"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              data-ocid="nav.cart_button"
              onClick={onCartOpen}
              style={{ color: "oklch(97.5% 0.008 75)" }}
              className="relative flex items-center gap-2 transition-opacity duration-200 hover:opacity-60"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-body font-semibold"
                  style={{
                    backgroundColor: "oklch(68% 0.09 35)",
                    color: "oklch(11% 0.01 55)",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              style={{ color: "oklch(97.5% 0.008 75)" }}
              className="md:hidden transition-opacity duration-200 hover:opacity-60"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: "oklch(14% 0.012 55)",
              borderColor: "oklch(28% 0.015 55)",
            }}
            className="md:hidden border-t"
          >
            <nav className="flex flex-col px-6 py-6 gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-ocid="nav.link"
                  onClick={() => setMobileOpen(false)}
                  style={{ color: "oklch(97.5% 0.008 75)" }}
                  className="font-body text-sm tracking-wider uppercase hover:opacity-60 transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
