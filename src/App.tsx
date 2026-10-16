import React from 'react';
import { CartProvider } from './context/CartContext';
import { useCart } from './context/useCart';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { ReservationSection } from './components/ReservationSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

const AppContent: React.FC = () => {
  const { setIsCartOpen } = useCart();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Skip to Content for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Sticky Navigation Header */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Page Content */}
      <main id="main-content" style={{ flex: 1 }}>
        <Hero />
        <MenuSection />
        <AboutSection />
        <GallerySection />
        <ReservationSection />
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-out Cart & WhatsApp Order Drawer */}
      <CartDrawer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;
