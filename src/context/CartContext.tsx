import React, { useState, useEffect, type ReactNode } from 'react';
import type { CartItem, DiningPreference, MenuItem } from '../types/restaurant';
import { restaurantConfig } from '../config/restaurantConfig';
import { CartContext } from './cartContextInstance';

const CART_STORAGE_KEY = 'a1_restaurant_cart_v1';
const CART_META_KEY = 'a1_restaurant_order_meta_v1';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('LocalStorage error reading cart:', e);
      return [];
    }
  });

  const [customerName, setCustomerName] = useState<string>(() => {
    try {
      const meta = localStorage.getItem(CART_META_KEY);
      return meta ? JSON.parse(meta).customerName || '' : '';
    } catch {
      return '';
    }
  });

  const [diningType, setDiningType] = useState<DiningPreference>('dine-in');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('LocalStorage error writing cart:', e);
    }
  }, [items]);

  // Sync meta to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        CART_META_KEY,
        JSON.stringify({ customerName, diningType })
      );
    } catch (e) {
      console.warn('LocalStorage error writing order meta:', e);
    }
  }, [customerName, diningType]);

  const addItem = (item: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const nextQty = ci.quantity + delta;
            return nextQty > 0 ? { ...ci, quantity: nextQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null);
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, ci) => sum + ci.quantity, 0);

  // Check if any item in cart has an unverified price (price === null)
  const hasUnverifiedPrices = items.some((ci) => ci.item.price === null);

  // Subtotal only calculated for items that have verified numerical prices
  const verifiedSubtotal = items.reduce((sum, ci) => {
    return ci.item.price !== null ? sum + ci.item.price * ci.quantity : sum;
  }, 0);

  const generateWhatsAppOrderUrl = (): string => {
    const lines: string[] = [];

    lines.push(`🍽️ *NEW ORDER REQUEST — ${restaurantConfig.name.toUpperCase()}*`);
    lines.push('──────────────────────────────');

    if (customerName.trim()) {
      lines.push(`👤 *Guest Name:* ${customerName.trim()}`);
    }

    lines.push(`📍 *Order Type:* ${diningType === 'dine-in' ? 'Dine-In' : 'Takeaway'}`);
    lines.push('──────────────────────────────');
    lines.push('📋 *Order Items:*');

    items.forEach((ci, idx) => {
      const dietTag =
        ci.item.dietType === 'egg'
          ? '[Egg]'
          : ci.item.isVeg === true
          ? '[Veg]'
          : '[Non-Veg]';
      if (ci.item.price !== null) {
        const itemTotal = ci.item.price * ci.quantity;
        lines.push(
          `${idx + 1}. ${ci.quantity}x ${ci.item.name} ${dietTag} — ₹${itemTotal} (₹${ci.item.price} each)`
        );
      } else {
        lines.push(
          `${idx + 1}. ${ci.quantity}x ${ci.item.name} ${dietTag} — (Price to be confirmed by restaurant)`
        );
      }
    });

    lines.push('──────────────────────────────');

    if (!hasUnverifiedPrices && verifiedSubtotal > 0) {
      lines.push(`💰 *Estimated Subtotal (Source-Listed):* ₹${verifiedSubtotal}`);
    } else {
      lines.push(`💰 *Total:* Pricing to be confirmed by restaurant upon receipt.`);
    }

    if (specialInstructions.trim()) {
      lines.push('──────────────────────────────');
      lines.push(`📝 *Special Instructions:* ${specialInstructions.trim()}`);
    }

    lines.push('──────────────────────────────');
    lines.push(
      '⚠️ *Important Note:* This is an order request. Prices listed are based on the Justdial directory. Availability, preparation time, and final billing must be confirmed directly by A1 Family Restaurant staff.'
    );

    const fullMessage = lines.join('\n');
    return `https://wa.me/${restaurantConfig.whatsappNumber}?text=${encodeURIComponent(
      fullMessage
    )}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        hasUnverifiedPrices,
        verifiedSubtotal,
        customerName,
        setCustomerName,
        diningType,
        setDiningType,
        specialInstructions,
        setSpecialInstructions,
        isCartOpen,
        setIsCartOpen,
        generateWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
