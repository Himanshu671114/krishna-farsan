import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ComboSection } from './components/ComboSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PosterModal } from './components/PosterModal';
import { Footer } from './components/Footer';
import { FARAL_PRODUCTS } from './data/products';
import { FARAL_COMBOS } from './data/combos';
import { CartItem, FaralProduct, FaralCombo } from './types';
import { calculateCartTotals, BUSINESS_PHONE, CONTACT_PERSON, WHATSAPP_NUMBER } from './utils/whatsapp';
import { Sparkles, ShoppingBag, ShieldCheck, Heart, Truck, Phone, MessageCircle } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'krishna_faral_cart_v2';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Track selected weight for each individual product (default 500g)
  const [selectedWeights, setSelectedWeights] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    FARAL_PRODUCTS.forEach((p) => {
      initial[p.id] = 500; // default to 500 g
    });
    return initial;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const { totalItemsCount, subtotal } = calculateCartTotals(cart);

  // Helper to get cart quantity for a specific product and weight
  const getProductCartQuantity = (productId: string, grams: number): number => {
    const cartId = `ind-${productId}-${grams}`;
    const found = cart.find((item) => item.cartId === cartId);
    return found ? found.quantity : 0;
  };

  // Helper to get combo quantity
  const getComboCartQuantity = (comboId: string): number => {
    const cartId = `combo-${comboId}`;
    const found = cart.find((item) => item.cartId === cartId);
    return found ? found.quantity : 0;
  };

  // Handle direct quantity modification for product and weight
  const handleProductQuantityChange = (
    product: FaralProduct,
    grams: number,
    weightLabel: string,
    packPrice: number,
    newQuantity: number
  ) => {
    const cartId = `ind-${product.id}-${grams}`;
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        return prevCart.filter((item) => item.cartId !== cartId);
      }
      const existingIndex = prevCart.findIndex((item) => item.cartId === cartId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQuantity,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartId,
          type: 'individual',
          productId: product.id,
          nameMr: product.nameMr,
          nameEn: product.nameEn,
          weightGrams: grams,
          weightLabel: weightLabel,
          unitPrice: packPrice,
          quantity: newQuantity,
          image: product.imageCrop.src,
          imageCrop: product.imageCrop,
        };
        return [...prevCart, newItem];
      }
    });
  };

  // Handle combo quantity change
  const handleComboQuantityChange = (combo: FaralCombo, newQuantity: number) => {
    const cartId = `combo-${combo.id}`;
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        return prevCart.filter((item) => item.cartId !== cartId);
      }
      const existingIndex = prevCart.findIndex((item) => item.cartId === cartId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQuantity,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartId,
          type: 'combo',
          productId: combo.id,
          nameMr: combo.nameMr,
          nameEn: combo.nameEn,
          unitPrice: combo.price,
          quantity: newQuantity,
          image: combo.image,
          imageCrop: combo.imageCrop,
          comboItems: combo.items,
        };
        return [...prevCart, newItem];
      }
    });
  };

  const handleUpdateCartQuantity = (cartId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.cartId === cartId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const handleRemoveCartItem = (cartId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF5EA] text-[#2B140E] flex flex-col font-sans">
      {/* Header */}
      <Header
        cartCount={totalItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPosterModal={() => setIsPosterModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero onOpenPosterModal={() => setIsPosterModalOpen(true)} />

      {/* MAIN SHOPPING SECTIONS */}
      <main className="flex-1">
        {/* SECTION A: INDIVIDUAL FARAL PRODUCTS */}
        <section id="individual-faral" className="py-14 px-4 sm:px-6 max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#7A1014] text-[#DFB047] rounded-full text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Traditional Sweets & Savouries · आमचे फराळ पदार्थ</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#580C0F]">
              Individual Faral Products
            </h2>

            <p className="text-sm text-[#665343]">
              Authentic Maharashtrian homemade recipes made fresh with pure ingredients. Choose your preferred pack size (500 g or 1 kg) and adjust quantities easily.
            </p>
          </div>

          {/* Grid of 9 Individual Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FARAL_PRODUCTS.map((product) => {
              const selectedWeight = selectedWeights[product.id] || 500;
              const cartQuantity = getProductCartQuantity(product.id, selectedWeight);

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  cartQuantity={cartQuantity}
                  selectedWeightGrams={selectedWeight}
                  onWeightChange={(grams) =>
                    setSelectedWeights((prev) => ({ ...prev, [product.id]: grams }))
                  }
                  onQuantityChange={handleProductQuantityChange}
                />
              );
            })}
          </div>
        </section>

        {/* Traditional Heritage Interlude / Trust Banner */}
        <section className="bg-gradient-to-r from-[#580C0F] via-[#7A1014] to-[#580C0F] text-[#FFFDF7] py-9 px-4 sm:px-6 border-t-2 border-b-2 border-[#C59B27]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded-xl bg-black/20 border border-[#C59B27]/30 space-y-2">
              <ShieldCheck className="w-8 h-8 text-[#DFB047] mx-auto" />
              <h3 className="text-base font-bold text-[#DFB047]">
                100% Pure Ghee & Quality Ingredients
              </h3>
              <p className="text-xs text-[#F3E9D2] leading-relaxed">
                Zero preservatives or artificial colors. Prepared in a clean, hygienic home kitchen with genuine ingredients.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/20 border border-[#C59B27]/30 space-y-2">
              <Truck className="w-8 h-8 text-[#DFB047] mx-auto" />
              <h3 className="text-base font-bold text-[#DFB047]">
                Free Home Delivery in Malad
              </h3>
              <p className="text-xs text-[#F3E9D2] leading-relaxed">
                Enjoy free home delivery anywhere in Malad. For other Mumbai suburbs, delivery charges are confirmed on order.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/20 border border-[#C59B27]/30 space-y-2">
              <Heart className="w-8 h-8 text-[#DFB047] mx-auto" />
              <h3 className="text-base font-bold text-[#DFB047]">
                Authentic Maharashtrian Taste
              </h3>
              <p className="text-xs text-[#F3E9D2] leading-relaxed">
                Spiky bhajani chakli, melt-in-mouth shankarpale, aromatic besan laddus, and thick spicy tikhat shev.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION B: FARAL COMBOS */}
        <ComboSection
          combos={FARAL_COMBOS}
          getComboQuantity={getComboCartQuantity}
          onUpdateComboQuantity={handleComboQuantityChange}
        />

        {/* Quick Order Callout Banner */}
        <section className="py-12 px-4 sm:px-6 bg-[#FAF5EA]">
          <div className="max-w-4xl mx-auto bg-[#FFFDF7] rounded-2xl p-6 sm:p-8 border-2 border-[#C59B27] shadow-xl text-center space-y-4">
            <div className="inline-block p-3 rounded-full bg-[#FAF5EA] text-[#7A1014]">
              <Phone className="w-8 h-8 text-[#C59B27]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-[#580C0F]">
                Order Directly via Phone or WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-[#665343]">
                Contact Person: <strong className="text-[#580C0F]">{CONTACT_PERSON}</strong> | Phone: <strong className="text-[#580C0F]">{BUSINESS_PHONE}</strong>
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#524338] max-w-lg mx-auto">
              Book your Diwali Faral early to avoid festive rush! Fresh, crispy, and securely packed delivered to your doorstep.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={`tel:${BUSINESS_PHONE}`}
                className="px-5 py-2.5 bg-[#7A1014] hover:bg-[#8B1419] text-[#FFFDF7] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#DFB047]" />
                <span>Call: {BUSINESS_PHONE}</span>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#1E7E34] hover:bg-[#155724] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Bottom Cart Bar */}
      {totalItemsCount > 0 && !isCartOpen && !isCheckoutOpen && (
        <div className="fixed bottom-4 inset-x-4 max-w-md mx-auto z-40 animate-bounce-in">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#580C0F] text-[#FFFDF7] p-3.5 rounded-2xl shadow-2xl border-2 border-[#DFB047] flex items-center justify-between gap-3 hover:bg-[#7A1014] transition-transform active:scale-98"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#DFB047] text-[#580C0F] flex items-center justify-center font-bold text-sm">
                {totalItemsCount}
              </div>
              <div className="text-left">
                <div className="text-xs font-bold">
                  {totalItemsCount} item{totalItemsCount > 1 ? 's' : ''} in Shopping Cart
                </div>
                <div className="text-[11px] text-[#DFB047]">
                  Tap to view and checkout
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-base font-black tabular-nums text-[#DFB047]">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
              <div className="bg-[#DFB047] text-[#580C0F] p-1.5 rounded-full">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
      />

      <PosterModal
        isOpen={isPosterModalOpen}
        onClose={() => setIsPosterModalOpen(false)}
      />
    </div>
  );
}
