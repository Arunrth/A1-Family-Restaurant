import React, { useState, useEffect } from 'react';
import { Monogram } from './Monogram';
import { useCart } from '../context/useCart';
import { restaurantConfig } from '../config/restaurantConfig';
import { ShoppingBag, Menu as MenuIcon, X, MessageCircle, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const { totalCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'About', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reserve', href: '#reservation' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className="navbar-wrapper"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 'var(--header-height)',
          zIndex: 1000,
          backgroundColor: isScrolled ? 'rgba(10, 10, 12, 0.95)' : 'rgba(10, 10, 12, 0.72)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: isScrolled
            ? '1px solid var(--border-subtle)'
            : '1px solid rgba(245, 240, 231, 0.05)',
          transition: 'all var(--transition-normal)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {/* Brand Mark */}
          <a
            href="#home"
            style={{ textDecoration: 'none' }}
            aria-label="A1 Family Restaurant Home"
          >
            <Monogram size={38} />
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="desktop-nav"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '32px',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link-item"
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  color: 'var(--text-secondary)',
                  position: 'relative',
                  padding: '8px 0',
                  transition: 'color var(--transition-fast)',
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Area */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Direct Telephone */}
            <a
              href={restaurantConfig.phoneLink}
              className="desktop-phone-btn"
              title={`Call ${restaurantConfig.phone}`}
              aria-label={`Call restaurant at ${restaurantConfig.phone}`}
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.84rem',
                color: 'var(--text-secondary)',
                padding: '9px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'rgba(23, 23, 28, 0.6)',
                transition: 'all var(--transition-fast)',
              }}
            >
              <Phone size={14} color="var(--accent-gold)" />
              <span className="num-tabular" style={{ letterSpacing: '0.02em' }}>
                {restaurantConfig.phone}
              </span>
            </a>

            {/* Standout WhatsApp Order Action */}
            <a
              href={restaurantConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp desktop-whatsapp-btn"
              style={{
                display: 'none',
                padding: '9px 18px',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <MessageCircle size={15} />
              <span>WhatsApp Order</span>
            </a>

            {/* Cart Trigger with Live Counter */}
            <button
              onClick={onOpenCart}
              aria-label={`Shopping Cart with ${totalCount} items`}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--surface-elevated)',
                border: '1px solid var(--border-subtle)',
                color: totalCount > 0 ? 'var(--accent-gold-soft)' : 'var(--text-main)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-gold)';
                e.currentTarget.style.boxShadow = '0 0 14px var(--accent-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <ShoppingBag size={18} />
              {totalCount > 0 && (
                <span
                  className="num-tabular"
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    backgroundColor: 'var(--accent-gold)',
                    color: '#0A0A0C',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    minWidth: '19px',
                    height: '19px',
                    borderRadius: 'var(--radius-xs)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 4px',
                    border: '1px solid var(--bg-primary)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.7)',
                  }}
                >
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-toggle-btn"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--surface-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-main)',
              }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 5, 7, 0.8)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 1050,
          }}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        id="mobile-navigation-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Drawer"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(330px, 86vw)',
          backgroundColor: 'var(--bg-secondary)',
          borderLeft: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-modal)',
          zIndex: 1100,
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform var(--transition-smooth)',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '20px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <Monogram size={34} />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--surface-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginTop: '28px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid transparent',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--surface-elevated)';
                e.currentTarget.style.color = 'var(--accent-gold-soft)';
                e.currentTarget.style.borderColor = 'var(--accent-border)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.color = 'var(--text-main)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div
          style={{
            marginTop: 'auto',
            paddingTop: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <a
            href={restaurantConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn btn-whatsapp"
            style={{ width: '100%' }}
          >
            <MessageCircle size={18} />
            <span>Order on WhatsApp</span>
          </a>

          <a
            href={restaurantConfig.phoneLink}
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn btn-outline"
            style={{ width: '100%' }}
          >
            <Phone size={15} />
            <span className="num-tabular">Call: {restaurantConfig.phone}</span>
          </a>
        </div>
      </aside>

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-phone-btn {
            display: inline-flex !important;
          }
          .desktop-whatsapp-btn {
            display: inline-flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
        .nav-link-item:hover {
          color: var(--accent-gold-soft) !important;
        }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 1.5px;
          background-color: var(--accent-gold);
          transition: all var(--transition-fast);
          transform: translateX(-50%);
        }
        .nav-link-item:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
};
