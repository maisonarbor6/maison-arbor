import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import CartDrawer from "./components/CartDrawer";
import CenterTablesSection from "./components/CenterTablesSection";
import CollectionsSection from "./components/CollectionsSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navigation from "./components/Navigation";
import NewsletterSection from "./components/NewsletterSection";
import PillarsSection from "./components/PillarsSection";
import StorySection from "./components/StorySection";
import TestimonialsSection from "./components/TestimonialsSection";
import TvBottomsSection from "./components/TvBottomsSection";
import { useGetCart, useInit } from "./hooks/useQueries";

const queryClient = new QueryClient();

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);
  useInit();
  const { data: cartItems = [] } = useGetCart();
  const cartCount = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "oklch(11% 0.01 55)",
        color: "oklch(97.5% 0.008 75)",
      }}
    >
      <Navigation cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main>
        <HeroSection />
        <CollectionsSection />
        <CenterTablesSection />
        <TvBottomsSection />
        <StorySection />
        <PillarsSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>

      <Footer />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
