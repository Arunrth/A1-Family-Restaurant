import React from 'react';
import { restaurantConfig } from '../config/restaurantConfig';
import {
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  Navigation,
  Clock,
} from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="section-padding"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">Find & Connect</div>
          <h2 className="section-title">Visit {restaurantConfig.name}</h2>
          <p className="section-subtitle">
            We look forward to welcoming you and your family. Reach out directly for table reservations,
            directions, or WhatsApp orders.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'stretch',
          }}
        >
          {/* Contact Details & Direct Action Cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Phone Card */}
            <div
              className="card-surface"
              style={{
                padding: '26px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '18px',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--accent-glow)',
                  border: '1px solid var(--accent-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Phone size={20} color="var(--accent-gold)" />
              </div>
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-gold)',
                  }}
                >
                  Direct Telephone
                </span>
                <h3
                  className="num-tabular"
                  style={{
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    marginTop: '4px',
                    marginBottom: '8px',
                  }}
                >
                  {restaurantConfig.phone}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Tap below to speak directly with our reception for table bookings and inquiries.
                </p>
                <a
                  href={restaurantConfig.phoneLink}
                  className="btn btn-primary"
                  style={{ fontSize: '0.86rem', padding: '10px 22px' }}
                >
                  <Phone size={15} />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div
              className="card-surface"
              style={{
                padding: '26px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '18px',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(37, 211, 102, 0.12)',
                  border: '1px solid rgba(37, 211, 102, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <MessageCircle size={20} color="#25D366" />
              </div>
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#25D366',
                  }}
                >
                  Instant WhatsApp
                </span>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    marginTop: '4px',
                    marginBottom: '8px',
                  }}
                >
                  WhatsApp Ordering & Chat
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Quickly message our staff to confirm today&apos;s specials, takeaway availability, and table bookings.
                </p>
                <a
                  href={restaurantConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ fontSize: '0.86rem', padding: '10px 22px' }}
                >
                  <MessageCircle size={15} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Operating Hours Notice */}
            <div
              className="card-surface"
              style={{
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                backgroundColor: 'rgba(23, 23, 28, 0.65)',
              }}
            >
              <Clock size={19} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>
                  Hours & Assistance
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                  {restaurantConfig.notices.hoursNotice}
                </p>
              </div>
            </div>
          </div>

          {/* Authoritative Google Maps Card */}
          <div
            className="card-surface"
            style={{
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '18px',
                }}
              >
                <span className="badge-gold">
                  <MapPin size={13} />
                  <span>Authoritative Location</span>
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.45rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  marginBottom: '10px',
                }}
              >
                {restaurantConfig.name}
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500, marginBottom: '8px' }}>
                {restaurantConfig.address}
              </p>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                View our verified Google Maps listing for real-time traffic, driving directions, and location coordinates.
              </p>

              {/* Interactive Architectural Map Display */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '260px',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-primary)',
                  marginBottom: '26px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                }}
              >
                <iframe
                  title="A1 Family Restaurant Location Map"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent('A one Family Restaurant, Mopka Chowk, Seepat Road, Mangla, Bilaspur, Chhattisgarh')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: 'invert(90%) hue-rotate(180deg) contrast(90%)',
                    display: 'block',
                  }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Floating badge inside map */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(10, 10, 12, 0.88)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--accent-border)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-xs)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    pointerEvents: 'none',
                  }}
                >
                  <MapPin size={14} color="var(--accent-gold)" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    A1 Family Restaurant • Navigation Ready
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Google Maps Action Button */}
            <div>
              <a
                href={restaurantConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '0.96rem',
                }}
              >
                <Navigation size={17} />
                <span>Open Google Maps Directions</span>
                <ExternalLink size={15} />
              </a>
              <span
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontSize: '0.74rem',
                  color: 'var(--text-muted)',
                  marginTop: '10px',
                }}
              >
                Authoritative Location Link: {restaurantConfig.mapsUrl.replace('https://', '')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
