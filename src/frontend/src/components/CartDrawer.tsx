import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { CartItem, Product } from "../backend.d";
import {
  useAddToCart,
  useGetAllProducts,
  useGetCart,
  useRemoveFromCart,
} from "../hooks/useQueries";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

function formatPrice(cents: bigint): string {
  const dollars = Number(cents) / 100;
  return `$${dollars.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { data: cartItems = [] } = useGetCart();
  const { data: products = [] } = useGetAllProducts();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const { mutate: addToCart } = useAddToCart();

  const getProduct = (id: bigint): Product | undefined =>
    products.find((p) => p.id === id);

  const subtotal = cartItems.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product ? product.priceCents * item.quantity : 0n);
  }, 0n);

  const handleRemove = (productId: bigint, name: string) => {
    removeFromCart(productId, {
      onSuccess: () => toast.success(`${name} removed from cart`),
      onError: () => toast.error("Failed to remove item"),
    });
  };

  const handleIncrement = (item: CartItem) => {
    addToCart({ productId: item.productId, quantity: 1n });
  };

  const handleDecrement = (item: CartItem) => {
    if (item.quantity <= 1n) {
      const product = getProduct(item.productId);
      handleRemove(item.productId, product?.name ?? "Item");
    } else {
      removeFromCart(item.productId, {
        onSuccess: () =>
          addToCart({
            productId: item.productId,
            quantity: item.quantity - 1n,
          }),
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        data-ocid="cart.sheet"
        side="right"
        className="w-full max-w-md p-0 flex flex-col"
        style={{
          backgroundColor: "oklch(14% 0.012 55)",
          borderColor: "oklch(28% 0.015 55)",
        }}
      >
        <SheetHeader className="px-6 pt-8 pb-4">
          <SheetTitle
            className="font-display text-2xl font-normal"
            style={{ color: "oklch(94% 0.005 75)" }}
          >
            Your Cart
          </SheetTitle>
        </SheetHeader>
        <Separator style={{ backgroundColor: "oklch(28% 0.015 55)" }} />

        {cartItems.length === 0 ? (
          <div
            data-ocid="cart.empty_state"
            className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center"
          >
            <ShoppingBag
              className="w-10 h-10"
              style={{ color: "oklch(40% 0.01 55)" }}
            />
            <p
              className="font-display text-xl"
              style={{ color: "oklch(94% 0.005 75)" }}
            >
              Your cart is empty
            </p>
            <p
              className="font-body text-sm"
              style={{ color: "oklch(65% 0.008 70)" }}
            >
              Add pieces to begin your collection.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="font-body text-xs tracking-widest uppercase underline underline-offset-4 mt-2 transition-opacity hover:opacity-60"
              style={{ color: "oklch(94% 0.005 75)" }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-6">
                {cartItems.map((item, i) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;
                  return (
                    <div
                      key={String(item.productId)}
                      data-ocid={`cart.item.${i + 1}`}
                      className="flex gap-4"
                    >
                      {/* Image placeholder */}
                      <div
                        className="w-20 h-20 shrink-0 rounded-sm"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(22% 0.015 55) 0%, oklch(16% 0.012 55) 100%)",
                        }}
                      />
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-display text-base leading-snug"
                          style={{ color: "oklch(94% 0.005 75)" }}
                        >
                          {product.name}
                        </p>
                        <p
                          className="font-body text-sm mt-0.5"
                          style={{ color: "oklch(68% 0.09 35)" }}
                        >
                          {formatPrice(product.priceCents)}
                        </p>
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            type="button"
                            onClick={() => handleDecrement(item)}
                            className="w-6 h-6 flex items-center justify-center transition-colors"
                            style={{
                              border: "1px solid oklch(28% 0.015 55)",
                              color: "oklch(94% 0.005 75)",
                            }}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span
                            className="font-body text-sm w-4 text-center"
                            style={{ color: "oklch(94% 0.005 75)" }}
                          >
                            {String(item.quantity)}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleIncrement(item)}
                            className="w-6 h-6 flex items-center justify-center transition-colors"
                            style={{
                              border: "1px solid oklch(28% 0.015 55)",
                              color: "oklch(94% 0.005 75)",
                            }}
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      {/* Remove */}
                      <button
                        type="button"
                        data-ocid={`cart.delete_button.${i + 1}`}
                        onClick={() =>
                          handleRemove(item.productId, product.name)
                        }
                        className="self-start mt-1 transition-opacity hover:opacity-60"
                        style={{ color: "oklch(65% 0.008 70)" }}
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            <div
              className="px-6 py-6 space-y-4"
              style={{ borderTop: "1px solid oklch(28% 0.015 55)" }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-body text-sm tracking-wider uppercase"
                  style={{ color: "oklch(65% 0.008 70)" }}
                >
                  Subtotal
                </span>
                <span
                  className="font-display text-2xl"
                  style={{ color: "oklch(94% 0.005 75)" }}
                >
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p
                className="font-body text-xs"
                style={{ color: "oklch(65% 0.008 70)" }}
              >
                Shipping and taxes calculated at checkout.
              </p>
              <Button
                data-ocid="cart.submit_button"
                className="w-full rounded-none font-body text-xs tracking-widest uppercase h-12"
                style={{
                  backgroundColor: "oklch(68% 0.09 35)",
                  color: "oklch(11% 0.01 55)",
                }}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
