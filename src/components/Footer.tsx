import React from 'react';
import { Monogram } from './Monogram';
import { restaurantConfig } from '../config/restaurantConfig';
import { Phone, MessageCircle, MapPin, ArrowUp } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#070709',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '64px',
        paddingBottom: '36px',
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '44px',
            paddingBottom: '48px',
            borderBottom: '1px solid rgba(245, 240, 231, 0.05)',
          }}
        >
          {/* Brand Info */}
          <div>
            <Monogram size={40} />
            <p
              style={{
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginTop: '18px',
                maxWidth: '320px',
              }}
            >
              A place for great food and good company. Welcoming families and friends for memorable dining experiences.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.92rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-main)',
                marginBottom: '18px',
              }}
            >
              Quick Navigation
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                { label: 'Home', href: '#home' },
                { label: 'Digital Menu', href: '#menu' },
                { label: 'Dining Experience', href: '#about' },
                { label: 'Culinary Gallery', href: '#gallery' },
                { label: 'Table Reservation', href: '#reservation' },
                { label: 'Location & Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--accent-gold-soft)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Verified Contact */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.92rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-main)',
                marginBottom: '18px',
              }}
            >
              Connect Directly
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <a
                href={restaurantConfig.phoneLink}
                className="num-tabular"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  transition: 'color var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-main)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <Phone size={15} color="var(--accent-gold)" />
                <span>{restaurantConfig.phone}</span>
              </a>

              <a
                href={restaurantConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  transition: 'color var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#25D366')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <MessageCircle size={15} color="#25D366" />
                <span>WhatsApp Order & Chat</span>
              </a>

              <a
                href={restaurantConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  transition: 'color var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-gold-soft)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <MapPin size={15} color="var(--accent-gold)" />
                <span>Google Maps Directions</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Row */}
        <div
          style={{
            paddingTop: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div className="num-tabular" style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            © {CURRENT_YEAR} {restaurantConfig.name}. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'rgba(23, 23, 28, 0.4)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
              e.currentTarget.style.color = 'var(--accent-gold-soft)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};
