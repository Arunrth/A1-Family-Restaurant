import { createContext } from 'react';
import type { CartItem, DiningPreference, MenuItem } from '../types/restaurant';

export interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  hasUnverifiedPrices: boolean;
  verifiedSubtotal: number;
  customerName: string;
  setCustomerName: (name: string) => void;
  diningType: DiningPreference;
  setDiningType: (type: DiningPreference) => void;
  specialInstructions: string;
  setSpecialInstructions: (note: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  generateWhatsAppOrderUrl: () => string;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
