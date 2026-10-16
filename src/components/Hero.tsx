import React from 'react';
import { restaurantConfig } from '../config/restaurantConfig';
import { Utensils, MessageCircle, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'calc(var(--header-height) + 36px)',
        paddingBottom: '80px',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      {/* Background Soft Atmospheric Lighting */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(210, 172, 104, 0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(23, 23, 28, 0.9) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Subtle Architectural Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(245, 240, 231, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(245, 240, 231, 0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        {/* Asymmetrical Editorial Grid */}
        <div className="hero-grid">
          {/* Left Editorial Narrative */}
          <div className="hero-text-col">
            {/* Brand Eyebrow */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '28px',
                  height: '1px',
                  backgroundColor: 'var(--accent-gold)',
                  opacity: 0.6,
                }}
              />
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                }}
              >
                {restaurantConfig.taglineEyebrow}
              </span>
            </div>

            {/* Editorial Headline with Intentional Line Breaks */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.35rem, 5.2vw, 4.1rem)',
                lineHeight: 1.14,
                fontWeight: 600,
                color: 'var(--text-main)',
                marginBottom: '26px',
                letterSpacing: '0.02em',
              }}
            >
              Good Food. <br />
              Great Company. <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--accent-gold-soft) 0%, var(--accent-gold) 65%, #A07F3E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Unforgettable Moments.
              </span>
            </h1>

            {/* Welcoming Narrative */}
            <p
              style={{
                fontSize: 'clamp(0.98rem, 1.4vw, 1.15rem)',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                marginBottom: '40px',
                maxWidth: '560px',
              }}
            >
              Welcome to {restaurantConfig.name} — where heartfelt family hospitality meets generous flavors.
              Gather around the table to share aromatic clay-pot biryanis, slow-simmered rich curries, and freshly baked tandoori breads
              crafted for comfort, conversation, and celebration.
            </p>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                alignItems: 'center',
                marginBottom: '36px',
              }}
            >
              <a
                href="#menu"
                className="btn btn-primary"
                style={{
                  padding: '15px 30px',
                  fontSize: '0.94rem',
                }}
              >
                <Utensils size={17} />
                <span>Explore Menu</span>
              </a>

              <a
                href={restaurantConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{
                  padding: '15px 26px',
                  fontSize: '0.94rem',
                }}
              >
                <MessageCircle size={17} />
                <span>Order on WhatsApp</span>
              </a>

              <a
                href={restaurantConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{
                  padding: '15px 22px',
                  fontSize: '0.92rem',
                }}
              >
                <MapPin size={16} color="var(--accent-gold)" />
                <span>Get Directions</span>
              </a>
            </div>

            {/* Subtle Operational Indicator */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(23, 23, 28, 0.7)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--success)',
                  boxShadow: '0 0 8px var(--success)',
                }}
              />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Welcoming Guests • Table Booking & WhatsApp Takeaway Available
              </span>
            </div>
          </div>

          {/* Right Cinematic Image Composition */}
          <div className="hero-visual-col">
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                backgroundColor: 'var(--surface-elevated)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-modal)',
              }}
            >
              <img
                src="/images/hero-spread.jpg"
                alt="A lavish multi-course feast at A1 Family Restaurant"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  aspectRatio: '5/4',
                  filter: 'contrast(1.05) brightness(0.95)',
                  transform: 'scale(1.01)',
                }}
                loading="eager"
              />

              {/* Controlled Cinematic Gradient Vignette */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, transparent 40%, rgba(10, 10, 12, 0.4) 70%, rgba(10, 10, 12, 0.92) 100%), linear-gradient(90deg, rgba(10, 10, 12, 0.4) 0%, transparent 40%)',
                }}
              />

              {/* Architectural Gold Corner Marks */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  width: '24px',
                  height: '24px',
                  borderTop: '2px solid var(--accent-gold)',
                  borderLeft: '2px solid var(--accent-gold)',
                  opacity: 0.8,
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  width: '24px',
                  height: '24px',
                  borderBottom: '2px solid var(--accent-gold)',
                  borderRight: '2px solid var(--accent-gold)',
                  opacity: 0.8,
                  pointerEvents: 'none',
                }}
              />

              {/* Bottom Editorial Caption Pill */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '22px',
                  left: '22px',
                  right: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(16, 16, 20, 0.85)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--accent-border)',
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      display: 'block',
                      letterSpacing: '0.04em',
                    }}
                  >
                    The Grand Family Table
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold-soft)' }}>
                    Signature Dum Biryanis, Tandoori Platters & Velvety Curries
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          alignItems: center;
        }

        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.95fr;
            gap: 64px;
          }
        }
      `}</style>
    </section>
  );
};
