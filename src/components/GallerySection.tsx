import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_ITEMS } from '../data/galleryData';
import type { GalleryItem } from '../types/restaurant';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const activeItem: GalleryItem | null =
    selectedItemIndex !== null ? GALLERY_ITEMS[selectedItemIndex] : null;

  const handlePrev = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
    );
  }, [selectedItemIndex]);

  const handleNext = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_ITEMS.length
    );
  }, [selectedItemIndex]);

  const handleClose = useCallback(() => {
    setSelectedItemIndex(null);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItemIndex === null) return;

      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex, handleClose, handlePrev, handleNext]);

  // Prevent background scroll when Lightbox is active
  useEffect(() => {
    if (selectedItemIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItemIndex]);

  return (
    <section
      id="gallery"
      className="section-padding"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">Visual Impressions</div>
          <h2 className="section-title">Culinary & Dining Gallery</h2>
          <p className="section-subtitle">
            A glimpse into the warmth, presentation, and dining moments at A1 Family Restaurant.
            Click any photograph to view in full resolution.
          </p>
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedItemIndex(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedItemIndex(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View photo: ${item.title}`}
              className="gallery-item-card"
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                backgroundColor: 'var(--surface-elevated)',
                border: '1px solid var(--border-subtle)',
                aspectRatio: '4/3',
                cursor: 'pointer',
                transition: 'all var(--transition-normal)',
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.altText}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform var(--transition-smooth), filter var(--transition-fast)',
                }}
                loading="lazy"
              />

              {/* Controlled Gradient Overlay */}
              <div
                className="gallery-caption-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, transparent 40%, rgba(10, 10, 12, 0.45) 70%, rgba(10, 10, 12, 0.94) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '20px',
                  transition: 'opacity var(--transition-normal)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        color: 'var(--text-main)',
                        marginBottom: '4px',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--accent-gold-soft)',
                        margin: 0,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'rgba(23, 23, 28, 0.85)',
                      border: '1px solid var(--accent-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-gold)',
                      flexShrink: 0,
                    }}
                  >
                    <Maximize2 size={15} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeItem && selectedItemIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Image Viewer: ${activeItem.title}`}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1300,
            backgroundColor: 'rgba(5, 5, 7, 0.95)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
          }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close image viewer (Escape)"
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--surface-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 1310,
              transition: 'border-color var(--transition-fast)',
            }}
          >
            <X size={20} />
          </button>

          {/* Previous button */}
          <button
            onClick={handlePrev}
            aria-label="Previous image (Left Arrow)"
            style={{
              position: 'absolute',
              left: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(23, 23, 28, 0.85)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 1310,
              transition: 'border-color var(--transition-fast)',
            }}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Image & Caption */}
          <div
            style={{
              maxWidth: '960px',
              width: '100%',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={activeItem.imageUrl}
              alt={activeItem.altText}
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                objectFit: 'contain',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-modal)',
                border: '1px solid var(--border-subtle)',
              }}
            />
            <div
              style={{
                marginTop: '18px',
                textAlign: 'center',
                maxWidth: '640px',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  marginBottom: '4px',
                  letterSpacing: '0.03em',
                }}
              >
                {activeItem.title}
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                {activeItem.description}
              </p>
              <span
                className="num-tabular"
                style={{
                  fontSize: '0.74rem',
                  color: 'var(--text-muted)',
                  marginTop: '6px',
                  display: 'inline-block',
                }}
              >
                {selectedItemIndex + 1} of {GALLERY_ITEMS.length}
              </span>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            aria-label="Next image (Right Arrow)"
            style={{
              position: 'absolute',
              right: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(23, 23, 28, 0.85)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 1310,
              transition: 'border-color var(--transition-fast)',
            }}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}

      <style>{`
        .gallery-item-card:hover img {
          transform: scale(1.03);
          filter: brightness(1.03);
        }
        .gallery-item-card:hover {
          border-color: var(--accent-gold) !important;
          box-shadow: var(--shadow-card);
        }
      `}</style>
    </section>
  );
};
