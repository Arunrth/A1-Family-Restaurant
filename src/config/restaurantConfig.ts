/**
 * A1 Family Restaurant Configuration
 * Authoritative business details, contact information, and theme constants.
 */

export const restaurantConfig = {
  name: 'A1 Family Restaurant',
  shortName: 'A1',
  taglineEyebrow: 'A PLACE FOR GREAT FOOD & GOOD COMPANY',
  headline: 'Good Food. Great Company. Unforgettable Moments.',
  description:
    'Welcome to A1 Family Restaurant — where heartfelt hospitality meets memorable flavors. Gather with family and friends to share generous portions, aromatic recipes, and an atmosphere crafted for warmth and celebration.',
  
  // Authoritative Contact Details
  phone: '+91 62664 44862',
  phoneLink: 'tel:+916266444862',
  whatsappNumber: '916266444862',
  whatsappUrl: 'https://wa.me/916266444862',
  
  // Authoritative Location Details
  address: 'Mopka Chowk, Seepat Road, Mangla, Bilaspur, Chhattisgarh 495001',
  mapsUrl: 'https://maps.app.goo.gl/guZ6V3uhJZ6RcDpt9',
  country: 'India',
  currency: 'INR',
  currencySymbol: '₹',

  // Verification & Policy Flags
  hasJustdialMenu: true,
  officialMenuVerified: false,

  notices: {
    menuStatus:
      'The 133 menu items and prices below are transcribed from the official Justdial directory listing for A one Family Restaurant, Bilaspur. Please note that item availability and final bill totals should be confirmed directly with the restaurant via WhatsApp.',
    orderConfirmation:
      'Orders placed via WhatsApp are order requests sent directly to A1 Family Restaurant staff. Final pricing and availability must be confirmed by the restaurant upon receipt.',
    reservationStatus:
      'This form sends a reservation request via WhatsApp. Table seating is subject to availability and direct confirmation from A1 Family Restaurant.',
    hoursNotice:
      'Open daily from 12:00 PM to 11:15 PM for family dining, takeaway, and celebrations. Please call or message on WhatsApp for today’s table inquiries.',
  },

  theme: {
    bgPrimary: '#0A0A0C',
    bgSecondary: '#101014',
    surfaceElevated: '#17171C',
    surfaceRaised: '#202027',
    accentGold: '#D2AC68',
    accentGoldSoft: '#E8CA91',
    textMain: '#F5F0E7',
    textSecondary: '#B0AAA1',
    textMuted: '#817C77',
    border: '#302E31',
    dividerSubtle: 'rgba(210, 172, 104, 0.22)',
    success: '#70C69A',
    error: '#F08A83',
  },
} as const;

export type RestaurantConfig = typeof restaurantConfig;
