import React, { useState, useMemo } from 'react';
import {
  MENU_CATEGORIES,
  JUSTDIAL_MENU_ITEMS,
  SAMPLE_PREVIEW_ITEMS,
  getDishImage,
} from '../data/menuData';
import type { MenuCategory, MenuItem } from '../types/restaurant';
import { useCart } from '../context/useCart';
import { restaurantConfig } from '../config/restaurantConfig';
import {
  Search,
  Plus,
  Minus,
  ShoppingBag,
  X,
  FileText,
} from 'lucide-react';

export const MenuSection: React.FC = () => {
  const { items: cartItems, addItem, updateQuantity, setIsCartOpen } = useCart();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg' | 'egg'>('all');
  // Allows switching between the 133 Justdial-imported items and the sample preview
  const [activeMenuSource, setActiveMenuSource] = useState<'justdial' | 'sample'>('justdial');

  // Determine active item set
  const rawItems = useMemo(() => {
    return activeMenuSource === 'justdial' ? JUSTDIAL_MENU_ITEMS : SAMPLE_PREVIEW_ITEMS;
  }, [activeMenuSource]);

  // Filter items based on active category, search query, and diet filter
  const filteredItems = useMemo(() => {
    return rawItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q));

      const matchesDiet =
        dietFilter === 'all' ||
        (dietFilter === 'veg' && item.dietType === 'veg') ||
        (dietFilter === 'non-veg' && item.dietType === 'non-veg') ||
        (dietFilter === 'egg' && item.dietType === 'egg');

      return matchesCategory && matchesSearch && matchesDiet;
    });
  }, [rawItems, activeCategory, searchQuery, dietFilter]);

  const getItemQuantityInCart = (itemId: string): number => {
    const found = cartItems.find((ci) => ci.item.id === itemId);
    return found ? found.quantity : 0;
  };

  const totalCartItemsCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  return (
    <section
      id="menu"
      className="section-padding"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">Authentic Flavors</div>
          <h2 className="section-title">Complete Digital Menu</h2>
          <p className="section-subtitle">
            Browse our full catalog of 133 dishes transcribed directly from our official Justdial listing.
            Select your items and send your order request directly via WhatsApp.
          </p>
        </div>

        {/* Source & Transparency Banner */}
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto 40px',
            padding: '20px 24px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--surface-elevated)',
            border: '1px solid var(--accent-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <FileText size={20} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: 'var(--text-main)',
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                }}
              >
                <span>Justdial Directory Source Listing</span>
                <span className="badge-gold" style={{ fontSize: '0.72rem' }}>
                  133 Items Transcribed
                </span>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {restaurantConfig.notices.menuStatus}
              </p>
            </div>
          </div>

          {/* Toggle between Justdial Import and Sample Preview */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '14px',
              borderTop: '1px solid rgba(210, 172, 104, 0.16)',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Viewing:</span>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: activeMenuSource === 'justdial' ? 'var(--accent-gold-soft)' : 'var(--text-main)',
                }}
              >
                {activeMenuSource === 'justdial'
                  ? 'Official Justdial Listing (133 Dishes & Prices)'
                  : 'Representative Sample Preview'}
              </span>
            </div>

            <button
              onClick={() =>
                setActiveMenuSource((prev) => (prev === 'justdial' ? 'sample' : 'justdial'))
              }
              style={{
                fontSize: '0.76rem',
                fontWeight: 600,
                color: 'var(--accent-gold)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                cursor: 'pointer',
              }}
            >
              {activeMenuSource === 'justdial'
                ? 'Switch to Sample Preview'
                : 'Switch to Full Justdial Menu (133 Items)'}
            </button>
          </div>
        </div>

        {/* Search & Filtering Navigation */}
        <div style={{ maxWidth: '920px', margin: '0 auto 40px' }}>
          {/* Search Box & Diet Filter Row */}
          <div
            style={{
              display: 'flex',
              gap: '14px',
              marginBottom: '20px',
              flexWrap: 'wrap',
            }}
          >
            {/* Search Input */}
            <div style={{ position: 'relative', flex: '1 1 300px' }}>
              <Search
                size={18}
                color="var(--text-muted)"
                style={{
                  position: 'absolute',
                  left: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across 133 dishes (e.g. Biryani, Paneer, Chicken, Paratha)..."
                aria-label="Search menu dishes"
                style={{
                  width: '100%',
                  padding: '14px 44px 14px 48px',
                  backgroundColor: 'var(--surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-main)',
                  fontSize: '0.92rem',
                  transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-gold)';
                  e.currentTarget.style.boxShadow = '0 0 16px var(--accent-glow)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Quick Dietary Filters */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'var(--surface-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '4px',
                gap: '4px',
              }}
            >
              {[
                { id: 'all', label: 'All Diets' },
                { id: 'veg', label: 'Veg' },
                { id: 'non-veg', label: 'Non-Veg' },
                { id: 'egg', label: 'Egg' },
              ].map((d) => {
                const isActive = dietFilter === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDietFilter(d.id as any)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      transition: 'all var(--transition-fast)',
                      backgroundColor: isActive ? 'var(--surface-raised)' : 'transparent',
                      color: isActive ? 'var(--accent-gold-soft)' : 'var(--text-secondary)',
                      border: isActive
                        ? '1px solid var(--accent-border)'
                        : '1px solid transparent',
                    }}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Minimalist Horizontal Category Rail */}
          <div
            className="category-tab-bar"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              overflowX: 'auto',
              paddingBottom: '10px',
              borderBottom: '1px solid var(--border-subtle)',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    position: 'relative',
                    padding: '10px 16px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.03em',
                    whiteSpace: 'nowrap',
                    transition: 'all var(--transition-fast)',
                    backgroundColor: isActive ? 'var(--surface-raised)' : 'transparent',
                    color: isActive ? 'var(--accent-gold-soft)' : 'var(--text-secondary)',
                    border: isActive
                      ? '1px solid var(--accent-border)'
                      : '1px solid transparent',
                  }}
                >
                  {cat.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-11px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '24px',
                        height: '2px',
                        backgroundColor: 'var(--accent-gold)',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Results Summary Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
            }}
          >
            <span>
              Showing <strong className="num-tabular" style={{ color: 'var(--text-main)' }}>{filteredItems.length}</strong> of{' '}
              <strong className="num-tabular" style={{ color: 'var(--text-main)' }}>{rawItems.length}</strong> dishes
            </span>
            {(searchQuery || dietFilter !== 'all' || activeCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setDietFilter('all');
                  setActiveCategory('all');
                }}
                style={{
                  color: 'var(--accent-gold)',
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                  textDecoration: 'underline',
                }}
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '22px',
            }}
          >
            {filteredItems.map((dish: MenuItem) => {
              const qtyInCart = getItemQuantityInCart(dish.id);
              return (
                <article
                  key={dish.id}
                  className="card-surface"
                  style={{
                    padding: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    backgroundColor: 'var(--surface-elevated)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {/* Dish Culinary Photo Banner */}
                  <div className="dish-card-media">
                    <img
                      src={dish.image || getDishImage(dish)}
                      alt={dish.name}
                      loading="lazy"
                      className="dish-card-image"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/hero-spread.jpg';
                      }}
                    />
                    <div className="dish-card-overlay" />

                    {/* Top Floating Diet Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        zIndex: 2,
                      }}
                    >
                      {dish.dietType ? (
                        <span
                          className={`diet-indicator ${dish.dietType}`}
                          title={
                            dish.dietType === 'egg'
                              ? 'Contains Egg'
                              : dish.dietType === 'veg'
                              ? 'Vegetarian'
                              : 'Non-Vegetarian'
                          }
                        />
                      ) : dish.isVeg !== null ? (
                        <span className={`diet-indicator ${dish.isVeg ? 'veg' : 'non-veg'}`} />
                      ) : null}

                      {dish.dietType && (
                        <span
                          className={`diet-label ${dish.dietType}`}
                          style={{
                            backgroundColor: 'rgba(10, 10, 12, 0.82)',
                            backdropFilter: 'blur(8px)',
                            padding: '2px 8px',
                            borderRadius: '2px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          {dish.dietType === 'egg'
                            ? 'Egg'
                            : dish.dietType === 'veg'
                            ? 'Veg'
                            : 'Non-Veg'}
                        </span>
                      )}
                    </div>

                    {/* Top Right Source Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        zIndex: 2,
                      }}
                    >
                      {dish.isSample ? (
                        <span className="badge-sample" title="Representative sample dish">
                          Sample
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: '0.65rem',
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            color: 'var(--text-muted)',
                            backgroundColor: 'rgba(10, 10, 12, 0.82)',
                            backdropFilter: 'blur(8px)',
                            padding: '2px 8px',
                            borderRadius: '2px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            fontWeight: 500,
                          }}
                        >
                          Justdial Listed
                        </span>
                      )}
                    </div>

                    {dish.tag && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          left: '12px',
                          zIndex: 2,
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.68rem',
                            letterSpacing: '0.04em',
                            fontWeight: 600,
                            color: 'var(--accent-gold-soft)',
                            backgroundColor: 'rgba(10, 10, 12, 0.85)',
                            padding: '2px 8px',
                            borderRadius: '2px',
                            border: '1px solid rgba(212, 175, 55, 0.35)',
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          {dish.tag}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content & Actions */}
                  <div
                    style={{
                      padding: '18px 20px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      flex: 1,
                    }}
                  >
                    <div>
                      {/* Dish Title */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.14rem',
                          fontWeight: 600,
                          color: 'var(--text-main)',
                          marginBottom: '6px',
                          lineHeight: 1.25,
                        }}
                      >
                        {dish.name}
                      </h3>

                      {/* Description if present */}
                      {dish.description && (
                        <p
                          style={{
                            fontSize: '0.84rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.55,
                            marginBottom: '16px',
                          }}
                        >
                          {dish.description}
                        </p>
                      )}
                    </div>

                  {/* Card Bottom: Tabular Price & Add / Quantity Controls */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '16px',
                      borderTop: '1px solid var(--border-subtle)',
                      marginTop: dish.description ? '0' : '16px',
                    }}
                  >
                    <div>
                      {dish.price !== null ? (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span
                            className="num-tabular"
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '1.24rem',
                              fontWeight: 700,
                              color: 'var(--accent-gold-soft)',
                            }}
                          >
                            ₹{dish.price}
                          </span>
                          <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                            Listed on Justdial
                          </span>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span
                            style={{
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              color: 'var(--accent-gold)',
                              letterSpacing: '0.03em',
                            }}
                          >
                            Price on Request
                          </span>
                          <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                            Verified via WhatsApp
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Add / Quantity Controller */}
                    <div>
                      {qtyInCart > 0 ? (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            backgroundColor: 'var(--bg-primary)',
                            border: '1px solid var(--accent-border)',
                            borderRadius: 'var(--radius-xs)',
                            padding: '3px',
                            gap: '8px',
                          }}
                        >
                          <button
                            onClick={() => updateQuantity(dish.id, -1)}
                            aria-label={`Decrease quantity of ${dish.name}`}
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '2px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--text-main)',
                              backgroundColor: 'var(--surface-elevated)',
                            }}
                          >
                            <Minus size={13} />
                          </button>
                          <span
                            className="num-tabular"
                            style={{
                              fontWeight: 700,
                              fontSize: '0.88rem',
                              minWidth: '20px',
                              textAlign: 'center',
                              color: 'var(--accent-gold-soft)',
                            }}
                          >
                            {qtyInCart}
                          </span>
                          <button
                            onClick={() => updateQuantity(dish.id, 1)}
                            aria-label={`Increase quantity of ${dish.name}`}
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '2px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#0A0A0C',
                              backgroundColor: 'var(--accent-gold)',
                            }}
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addItem(dish)}
                          className="btn btn-gold-outline"
                          style={{
                            padding: '8px 16px',
                            fontSize: '0.82rem',
                            borderRadius: 'var(--radius-sm)',
                          }}
                        >
                          <ShoppingBag size={14} />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        ) : (
          /* Empty States Handling */
          <div
            style={{
              padding: '64px 24px',
              textAlign: 'center',
              backgroundColor: 'var(--surface-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              maxWidth: '580px',
              margin: '0 auto',
            }}
          >
            <Search size={36} color="var(--accent-gold)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-main)' }}>
              No dishes found
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              We couldn&apos;t find any dishes matching your current search or diet filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietFilter('all');
                setActiveCategory('all');
              }}
              className="btn btn-outline"
              style={{ fontSize: '0.84rem' }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Floating Cart Review Trigger */}
        {cartItems.length > 0 && (
          <div
            style={{
              position: 'sticky',
              bottom: '24px',
              marginTop: '44px',
              display: 'flex',
              justifyContent: 'center',
              zIndex: 100,
            }}
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn btn-primary"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
                padding: '14px 28px',
                fontSize: '0.95rem',
                border: '1px solid var(--accent-gold-soft)',
              }}
            >
              <ShoppingBag size={18} />
              <span>
                Review Cart & WhatsApp Order (
                <span className="num-tabular">{totalCartItemsCount}</span> items)
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
