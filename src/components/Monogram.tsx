import React from 'react';

interface MonogramProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export const Monogram: React.FC<MonogramProps> = ({
  size = 42,
  className = '',
  showText = true,
}) => {
  return (
    <div
      className={`brand-mark ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '14px' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="atelierGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8CA91" />
            <stop offset="50%" stopColor="#D2AC68" />
            <stop offset="100%" stopColor="#9E7A35" />
          </linearGradient>
          <linearGradient id="atelierSurface" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1B1B22" />
            <stop offset="100%" stopColor="#0E0E12" />
          </linearGradient>
        </defs>

        {/* Outer Architectural Border */}
        <rect
          x="1"
          y="1"
          width="62"
          height="62"
          rx="6"
          fill="url(#atelierSurface)"
          stroke="url(#atelierGold)"
          strokeWidth="1.2"
          strokeOpacity="0.8"
        />

        {/* Inner Fine Hairline Frame */}
        <rect
          x="5"
          y="5"
          width="54"
          height="54"
          rx="4"
          fill="none"
          stroke="url(#atelierGold)"
          strokeWidth="0.8"
          strokeOpacity="0.35"
        />

        {/* Minimal Corner Accents */}
        <line x1="8" y1="8" x2="14" y2="8" stroke="url(#atelierGold)" strokeWidth="1" strokeOpacity="0.9" />
        <line x1="8" y1="8" x2="8" y2="14" stroke="url(#atelierGold)" strokeWidth="1" strokeOpacity="0.9" />
        <line x1="56" y1="8" x2="50" y2="8" stroke="url(#atelierGold)" strokeWidth="1" strokeOpacity="0.9" />
        <line x1="56" y1="8" x2="56" y2="14" stroke="url(#atelierGold)" strokeWidth="1" strokeOpacity="0.9" />
        <line x1="8" y1="56" x2="14" y2="56" stroke="url(#atelierGold)" strokeWidth="1" strokeOpacity="0.9" />
        <line x1="8" y1="56" x2="8" y2="50" stroke="url(#atelierGold)" strokeWidth="1" strokeOpacity="0.9" />
        <line x1="56" y1="56" x2="50" y2="56" stroke="url(#atelierGold)" strokeWidth="1" strokeOpacity="0.9" />
        <line x1="56" y1="56" x2="56" y2="50" stroke="url(#atelierGold)" strokeWidth="1" strokeOpacity="0.9" />

        {/* Monogram A1 Typography */}
        <text
          x="32"
          y="41"
          fontFamily="'Cinzel', Georgia, serif"
          fontSize="24"
          fontWeight="700"
          fill="url(#atelierGold)"
          textAnchor="middle"
          letterSpacing="0.05em"
        >
          A1
        </text>

        {/* Fine Horizontal Accent Rule */}
        <line
          x1="22"
          y1="47"
          x2="42"
          y2="47"
          stroke="url(#atelierGold)"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: 'var(--text-main)',
            }}
          >
            A1 FAMILY
          </span>
          <span
            style={{
              fontSize: '0.66rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
              fontWeight: 600,
              marginTop: '3px',
            }}
          >
            RESTAURANT
          </span>
        </div>
      )}
    </div>
  );
};
