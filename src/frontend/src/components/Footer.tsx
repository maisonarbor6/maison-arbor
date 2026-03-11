import { SiInstagram, SiPinterest } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? window.location.hostname
      : "maisonarbor.com";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "oklch(11% 0.01 55)",
        color: "oklch(97.5% 0.008 75)",
        borderColor: "oklch(97.5% 0.008 75 / 0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-display text-2xl tracking-widest mb-2">
              MAISON ARBOR
            </p>
            <p
              className="font-body text-xs tracking-widest uppercase mb-6"
              style={{ color: "oklch(97.5% 0.008 75 / 0.5)" }}
            >
              Rooted in Excellence
            </p>
            <p
              className="font-body text-sm leading-relaxed max-w-xs"
              style={{ color: "oklch(97.5% 0.008 75 / 0.5)" }}
            >
              Crafting extraordinary furniture for extraordinary spaces. Each
              piece is a testament to the enduring art of fine craftsmanship.
            </p>
          </div>

          {/* Collections */}
          <div>
            <p
              className="font-body text-xs tracking-widest uppercase mb-6"
              style={{ color: "oklch(97.5% 0.008 75 / 0.3)" }}
            >
              Collections
            </p>
            <ul className="space-y-3">
              {[
                "Living Room",
                "Bedroom",
                "Dining",
                "Outdoor",
                "New Arrivals",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#collections"
                    className="font-body text-sm transition-colors"
                    style={{ color: "oklch(97.5% 0.008 75 / 0.6)" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <p
              className="font-body text-xs tracking-widest uppercase mb-6"
              style={{ color: "oklch(97.5% 0.008 75 / 0.3)" }}
            >
              Customer Care
            </p>
            <ul className="space-y-3">
              {[
                "Shipping & Returns",
                "Care Instructions",
                "Warranty",
                "Trade Program",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#curated-pieces"
                    className="font-body text-sm transition-colors"
                    style={{ color: "oklch(97.5% 0.008 75 / 0.6)" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div>
            <p
              className="font-body text-xs tracking-widest uppercase mb-6"
              style={{ color: "oklch(97.5% 0.008 75 / 0.3)" }}
            >
              Follow Us
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: "oklch(97.5% 0.008 75 / 0.5)" }}
                className="transition-opacity hover:opacity-100"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                style={{ color: "oklch(97.5% 0.008 75 / 0.5)" }}
                className="transition-opacity hover:opacity-100"
              >
                <SiPinterest className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "oklch(97.5% 0.008 75 / 0.1)" }}
        >
          <p
            className="font-body text-xs"
            style={{ color: "oklch(97.5% 0.008 75 / 0.3)" }}
          >
            &copy; {year} Maison Arbor. All rights reserved.
          </p>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs transition-colors"
            style={{ color: "oklch(97.5% 0.008 75 / 0.3)" }}
          >
            Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
