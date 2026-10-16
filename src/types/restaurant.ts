/**
 * Type definitions for A1 Family Restaurant
 */

export type MenuCategory = 
  | 'all'
  | 'breads'
  | 'mains'
  | 'pizza-pasta'
  | 'rice-biryani'
  | 'rice-noodles'
  | 'snacks'
  | 'soups-salads'
  | 'starters';

export type DietType = 'veg' | 'non-veg' | 'egg';

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  category: Exclude<MenuCategory, 'all'>;
  // If price is null or undefined, it indicates price is pending verification or available on request
  price: number | null;
  dietType?: DietType;
  isVeg: boolean | null; // true for veg, false for non-veg or egg
  isSample: boolean;
  priceSource: 'justdial_listed' | 'verified_restaurant' | 'unverified';
  tag?: string;
  image?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export type DiningPreference = 'dine-in' | 'takeaway';

export interface ReservationFormData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion?: string;
  notes?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ambience' | 'dishes' | 'feasts';
  description: string;
  imageUrl: string;
  altText: string;
}
