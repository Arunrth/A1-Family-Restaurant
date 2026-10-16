import React from 'react';
import { restaurantConfig } from '../config/restaurantConfig';
import { Users, HeartHandshake, UtensilsCrossed } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      icon: Users,
      title: 'Family-First Hospitality',
      description:
        'Spacious, comfortable seating designed specifically for families, relatives, and friendly gatherings to relax together.',
    },
    {
      icon: UtensilsCrossed,
      title: 'Shared Dining Experience',
      description:
        'Generous platters and balanced courses made for passing around the table, celebrating togetherness over hearty meals.',
    },
    {
      icon: HeartHandshake,
      title: 'Warm & Attentive Service',
      description:
        'A dedicated service team attentive to your family needs, ensuring your time spent with us is comfortable and memorable.',
    },
  ];

  return (
    <section id="about" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '56px',
            alignItems: 'center',
          }}
        >
          {/* Left Magazine Visual Composition */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                backgroundColor: 'var(--surface-elevated)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <img
                src="/images/about-ambience.jpg"
                alt="Warm family dining interior at A1 Family Restaurant"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                  filter: 'contrast(1.04) brightness(0.96)',
                }}
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, transparent 55%, rgba(10, 10, 12, 0.88) 100%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(16, 16, 20, 0.85)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    padding: '10px 18px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--accent-border)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Comfortable Seating & Ambient Warmth
                  </span>
                </div>
              </div>
            </div>

            {/* Architectural Gold Bracket Details */}
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                left: '-12px',
                width: '36px',
                height: '36px',
                borderTop: '2px solid var(--accent-gold)',
                borderLeft: '2px solid var(--accent-gold)',
                opacity: 0.7,
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-12px',
                right: '-12px',
                width: '36px',
                height: '36px',
                borderBottom: '2px solid var(--accent-gold)',
                borderRight: '2px solid var(--accent-gold)',
                opacity: 0.7,
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Right Editorial Storytelling */}
          <div>
            <div className="eyebrow" style={{ justifyContent: 'flex-start' }}>
              The Dining Experience
            </div>
            <h2
              style={{
                fontSize: 'clamp(2.1rem, 4vw, 2.9rem)',
                lineHeight: 1.2,
                marginBottom: '22px',
                color: 'var(--text-main)',
                fontWeight: 600,
              }}
            >
              Created for Families. <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--accent-gold-soft) 0%, var(--accent-gold) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Celebrated in Company.
              </span>
            </h2>

            <p
              style={{
                fontSize: '1.02rem',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                marginBottom: '20px',
              }}
            >
              At {restaurantConfig.name}, dining is more than just sharing a plate — it is about taking
              time away from busy routines to laugh, converse, and celebrate everyday moments with the
              people who matter most.
            </p>

            <p
              style={{
                fontSize: '0.94rem',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
                marginBottom: '38px',
              }}
            >
              Whether you are planning a relaxed family weekend dinner, a birthday gathering,
              or a quick takeaway order on your way home, our kitchen and service team are dedicated
              to delivering genuine flavors and respectful hospitality.
            </p>

            {/* Highlight Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {highlights.map((h, idx) => {
                const Icon = h.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      padding: '18px',
                      backgroundColor: 'var(--surface-elevated)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      transition: 'border-color var(--transition-fast)',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--accent-glow)',
                        border: '1px solid var(--accent-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={19} color="var(--accent-gold)" />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: '0.98rem',
                          fontWeight: 600,
                          color: 'var(--text-main)',
                          marginBottom: '4px',
                        }}
                      >
                        {h.title}
                      </h3>
                      <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                        {h.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
