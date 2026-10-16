import React, { useEffect } from 'react';
import { useCart } from '../context/useCart';
import { restaurantConfig } from '../config/restaurantConfig';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    hasUnverifiedPrices,
    verifiedSubtotal,
    customerName,
    setCustomerName,
    diningType,
    setDiningType,
    specialInstructions,
    setSpecialInstructions,
    generateWhatsAppOrderUrl,
  } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const totalItemsCount = items.reduce((sum, ci) => sum + ci.quantity, 0);

  const handleSendOrder = () => {
    const url = generateWhatsAppOrderUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Order Cart and WhatsApp Checkout"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(5, 5, 7, 0.82)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />

      {/* Drawer Panel */}
      <div
        style={{
          position: 'relative',
          width: 'min(480px, 94vw)',
          height: '100%',
          backgroundColor: 'var(--bg-secondary)',
          borderLeft: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-modal)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1210,
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '22px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--surface-elevated)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShoppingBag size={20} color="var(--accent-gold)" />
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.18rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  margin: 0,
                  letterSpacing: '0.03em',
                }}
              >
                Your Order Cart
              </h2>
              <span className="num-tabular" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {items.length === 0 ? (
            /* Empty Cart State */
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '40px 10px',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <ShoppingBag size={28} color="var(--text-muted)" />
              </div>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  marginBottom: '8px',
                }}
              >
                Your cart is empty
              </h3>
              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '24px',
                  maxWidth: '280px',
                }}
              >
                Explore our digital menu and add your favorite dishes to start a WhatsApp order request.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn btn-primary"
                style={{ fontSize: '0.88rem' }}
              >
                <span>Browse Menu</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-gold)',
                    }}
                  >
                    Selected Dishes
                  </span>
                  <button
                    onClick={clearCart}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '0.76rem',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                    }}
                  >
                    <Trash2 size={13} />
                    <span>Clear all</span>
                  </button>
                </div>

                {items.map((ci) => (
                  <div
                    key={ci.item.id}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                  >
                    <img
                      src={ci.item.image || '/images/hero-spread.jpg'}
                      alt={ci.item.name}
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: 'var(--radius-xs)',
                        objectFit: 'cover',
                        flexShrink: 0,
                        border: '1px solid var(--border-subtle)',
                      }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/hero-spread.jpg';
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        {ci.item.dietType ? (
                          <span
                            className={`diet-indicator ${ci.item.dietType}`}
                            title={
                              ci.item.dietType === 'egg'
                                ? 'Contains Egg'
                                : ci.item.dietType === 'veg'
                                ? 'Vegetarian'
                                : 'Non-Vegetarian'
                            }
                          />
                        ) : ci.item.isVeg !== null ? (
                          <span className={`diet-indicator ${ci.item.isVeg ? 'veg' : 'non-veg'}`} />
                        ) : null}
                        <h4
                          style={{
                            fontSize: '0.94rem',
                            fontWeight: 600,
                            color: 'var(--text-main)',
                            lineHeight: 1.25,
                          }}
                        >
                          {ci.item.name}
                        </h4>
                      </div>

                      <div style={{ fontSize: '0.82rem', marginTop: '4px' }}>
                        {ci.item.price !== null ? (
                          <span className="num-tabular" style={{ color: 'var(--accent-gold-soft)', fontWeight: 600 }}>
                            ₹{ci.item.price * ci.quantity}{' '}
                            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
                              (₹{ci.item.price} x {ci.quantity})
                            </span>
                          </span>
                        ) : (
                          <span style={{ color: 'var(--accent-gold)', fontSize: '0.76rem' }}>
                            Price to be confirmed by restaurant
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Adjustment */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          backgroundColor: 'var(--bg-primary)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-xs)',
                          padding: '2px',
                          gap: '6px',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(ci.item.id, -1)}
                          aria-label={`Reduce quantity of ${ci.item.name}`}
                          style={{
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-main)',
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span
                          className="num-tabular"
                          style={{
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            minWidth: '16px',
                            textAlign: 'center',
                            color: 'var(--accent-gold-soft)',
                          }}
                        >
                          {ci.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(ci.item.id, 1)}
                          aria-label={`Increase quantity of ${ci.item.name}`}
                          style={{
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#0A0A0C',
                            backgroundColor: 'var(--accent-gold)',
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(ci.item.id)}
                        aria-label={`Remove ${ci.item.name} from cart`}
                        style={{
                          color: 'var(--text-muted)',
                          padding: '4px',
                          cursor: 'pointer',
                        }}
                        title="Remove dish"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Options */}
              <div
                style={{
                  padding: '18px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {/* Dining Preference: Dine-in or Takeaway */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      marginBottom: '8px',
                    }}
                  >
                    Dining Preference
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setDiningType('dine-in')}
                      style={{
                        padding: '10px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        textAlign: 'center',
                        transition: 'all var(--transition-fast)',
                        backgroundColor:
                          diningType === 'dine-in' ? 'var(--accent-gold)' : 'var(--bg-primary)',
                        color: diningType === 'dine-in' ? '#0A0A0C' : 'var(--text-secondary)',
                        border:
                          diningType === 'dine-in'
                            ? '1px solid var(--accent-gold-soft)'
                            : '1px solid var(--border-subtle)',
                      }}
                    >
                      Dine-in Order
                    </button>
                    <button
                      type="button"
                      onClick={() => setDiningType('takeaway')}
                      style={{
                        padding: '10px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        textAlign: 'center',
                        transition: 'all var(--transition-fast)',
                        backgroundColor:
                          diningType === 'takeaway' ? 'var(--accent-gold)' : 'var(--bg-primary)',
                        color: diningType === 'takeaway' ? '#0A0A0C' : 'var(--text-secondary)',
                        border:
                          diningType === 'takeaway'
                            ? '1px solid var(--accent-gold-soft)'
                            : '1px solid var(--border-subtle)',
                      }}
                    >
                      Takeaway Order
                    </button>
                  </div>
                </div>

                {/* Customer Name */}
                <div>
                  <label
                    htmlFor="cart-customer-name"
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      marginBottom: '6px',
                    }}
                  >
                    Your Name (Optional)
                  </label>
                  <input
                    id="cart-customer-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.88rem',
                      color: 'var(--text-main)',
                    }}
                  />
                </div>

                {/* Special Instructions */}
                <div>
                  <label
                    htmlFor="cart-special-instructions"
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      marginBottom: '6px',
                    }}
                  >
                    Preparation Notes / Spice Preference (Optional)
                  </label>
                  <textarea
                    id="cart-special-instructions"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Medium spicy, pack extra mint chutney..."
                    rows={2}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.88rem',
                      color: 'var(--text-main)',
                      resize: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Order Notice */}
              <div
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(210, 172, 104, 0.08)',
                  border: '1px solid var(--accent-border)',
                  fontSize: '0.8rem',
                  lineHeight: 1.55,
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  gap: '12px',
                }}
              >
                <AlertCircle size={18} color="var(--accent-gold-soft)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '2px' }}>
                    Order & Pricing Notice
                  </strong>
                  Sending this message via WhatsApp submits an order request directly to{' '}
                  <strong style={{ color: 'var(--text-main)' }}>{restaurantConfig.name}</strong>.
                  Official prices, availability, and preparation timelines will be confirmed directly by the restaurant team.
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--surface-elevated)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {/* Totals */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>Estimated Subtotal</span>
              {hasUnverifiedPrices ? (
                <div style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: 'var(--accent-gold)',
                    }}
                  >
                    Pricing to be confirmed
                  </span>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    (Awaiting restaurant verification)
                  </span>
                </div>
              ) : (
                <span
                  className="num-tabular"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--accent-gold-soft)',
                  }}
                >
                  ₹{verifiedSubtotal}
                </span>
              )}
            </div>

            {/* Direct WhatsApp Order Action */}
            <button
              onClick={handleSendOrder}
              className="btn btn-whatsapp"
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '0.96rem',
              }}
            >
              <MessageCircle size={18} />
              <span>Send Order to A1 Restaurant WhatsApp</span>
            </button>

            <p
              className="num-tabular"
              style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}
            >
              Direct message opens in WhatsApp for {restaurantConfig.phone}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
