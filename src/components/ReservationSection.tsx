import React, { useState } from 'react';
import { restaurantConfig } from '../config/restaurantConfig';
import type { ReservationFormData } from '../types/restaurant';
import {
  Calendar,
  Clock,
  Users,
  User,
  Phone,
  MessageCircle,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const ReservationSection: React.FC = () => {
  const [today] = useState(getTodayDateString);

  const [formData, setFormData] = useState<ReservationFormData>(() => ({
    name: '',
    phone: '',
    date: getTodayDateString(),
    time: '19:30',
    guests: '4',
    occasion: 'Family Dining',
    notes: '',
  }));

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name';
    }

    const cleanedPhone = formData.phone.replace(/[\s-+()]/g, '');
    const indianPhoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!indianPhoneRegex.test(formData.phone.trim()) && cleanedPhone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    } else if (formData.date < today) {
      newErrors.date = 'Reservation date cannot be in the past';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a preferred time';
    }

    if (!formData.guests) {
      newErrors.guests = 'Please specify guest count';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const lines = [
      `📅 *TABLE RESERVATION REQUEST — ${restaurantConfig.name.toUpperCase()}*`,
      '──────────────────────────────',
      `👤 *Guest Name:* ${formData.name.trim()}`,
      `📞 *Contact Number:* ${formData.phone.trim()}`,
      `🗓️ *Date:* ${formData.date}`,
      `⏰ *Preferred Time:* ${formData.time}`,
      `👥 *Number of Guests:* ${formData.guests}`,
      `🎉 *Occasion:* ${formData.occasion || 'Dining with Family'}`,
    ];

    if (formData.notes && formData.notes.trim()) {
      lines.push('──────────────────────────────');
      lines.push(`📝 *Special Requests:* ${formData.notes.trim()}`);
    }

    lines.push('──────────────────────────────');
    lines.push(
      '⚠️ *Notice:* This is a reservation request. Seating and table availability must be confirmed directly by A1 Family Restaurant.'
    );

    const message = lines.join('\n');
    const url = `https://wa.me/${restaurantConfig.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="reservation"
      className="section-padding"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">Plan Your Visit</div>
          <h2 className="section-title">Table Reservation Request</h2>
          <p className="section-subtitle">
            Planning a meal with family or friends? Submit your preferred date and seating details.
            Our team will confirm table availability directly with you via WhatsApp.
          </p>
        </div>

        <div
          style={{
            maxWidth: '740px',
            margin: '0 auto',
            backgroundColor: 'var(--surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '40px 32px',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '22px',
                marginBottom: '22px',
              }}
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="res-name"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    marginBottom: '8px',
                  }}
                >
                  <User size={15} color="var(--accent-gold)" />
                  <span>Full Name *</span>
                </label>
                <input
                  id="res-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="e.g. Arun Rathore"
                  style={{
                    width: '100%',
                    padding: '13px 15px',
                    backgroundColor: 'var(--bg-primary)',
                    border: errors.name ? '1px solid var(--error)' : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem',
                    color: 'var(--text-main)',
                    transition: 'border-color var(--transition-fast)',
                  }}
                />
                {errors.name && (
                  <span style={{ fontSize: '0.74rem', color: 'var(--error)', marginTop: '5px', display: 'block' }}>
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label
                  htmlFor="res-phone"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    marginBottom: '8px',
                  }}
                >
                  <Phone size={15} color="var(--accent-gold)" />
                  <span>Mobile Number *</span>
                </label>
                <input
                  id="res-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder="10-digit mobile number"
                  className="num-tabular"
                  style={{
                    width: '100%',
                    padding: '13px 15px',
                    backgroundColor: 'var(--bg-primary)',
                    border: errors.phone ? '1px solid var(--error)' : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem',
                    color: 'var(--text-main)',
                    transition: 'border-color var(--transition-fast)',
                  }}
                />
                {errors.phone && (
                  <span style={{ fontSize: '0.74rem', color: 'var(--error)', marginTop: '5px', display: 'block' }}>
                    {errors.phone}
                  </span>
                )}
              </div>

              {/* Date */}
              <div>
                <label
                  htmlFor="res-date"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    marginBottom: '8px',
                  }}
                >
                  <Calendar size={15} color="var(--accent-gold)" />
                  <span>Reservation Date *</span>
                </label>
                <input
                  id="res-date"
                  type="date"
                  min={today}
                  required
                  value={formData.date}
                  onChange={(e) => {
                    setFormData({ ...formData, date: e.target.value });
                    if (errors.date) setErrors({ ...errors, date: '' });
                  }}
                  className="num-tabular"
                  style={{
                    width: '100%',
                    padding: '13px 15px',
                    backgroundColor: 'var(--bg-primary)',
                    border: errors.date ? '1px solid var(--error)' : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem',
                    color: 'var(--text-main)',
                    colorScheme: 'dark',
                    transition: 'border-color var(--transition-fast)',
                  }}
                />
                {errors.date && (
                  <span style={{ fontSize: '0.74rem', color: 'var(--error)', marginTop: '5px', display: 'block' }}>
                    {errors.date}
                  </span>
                )}
              </div>

              {/* Preferred Time */}
              <div>
                <label
                  htmlFor="res-time"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    marginBottom: '8px',
                  }}
                >
                  <Clock size={15} color="var(--accent-gold)" />
                  <span>Preferred Time *</span>
                </label>
                <select
                  id="res-time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '13px 15px',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem',
                    color: 'var(--text-main)',
                  }}
                >
                  <option value="12:30">12:30 PM (Lunch)</option>
                  <option value="13:00">01:00 PM (Lunch)</option>
                  <option value="13:30">01:30 PM (Lunch)</option>
                  <option value="14:00">02:00 PM (Lunch)</option>
                  <option value="19:00">07:00 PM (Dinner)</option>
                  <option value="19:30">07:30 PM (Dinner)</option>
                  <option value="20:00">08:00 PM (Dinner)</option>
                  <option value="20:30">08:30 PM (Dinner)</option>
                  <option value="21:00">09:00 PM (Dinner)</option>
                  <option value="21:30">09:30 PM (Dinner)</option>
                  <option value="22:00">10:00 PM (Late Dinner)</option>
                </select>
              </div>

              {/* Number of Guests */}
              <div>
                <label
                  htmlFor="res-guests"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    marginBottom: '8px',
                  }}
                >
                  <Users size={15} color="var(--accent-gold)" />
                  <span>Number of Guests *</span>
                </label>
                <select
                  id="res-guests"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '13px 15px',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem',
                    color: 'var(--text-main)',
                  }}
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4 Persons (Family Table)</option>
                  <option value="5">5 Persons</option>
                  <option value="6">6 Persons (Large Family Table)</option>
                  <option value="7-10">7 - 10 Persons (Group Seating)</option>
                  <option value="10+">10+ Persons (Party Gathering)</option>
                </select>
              </div>

              {/* Occasion */}
              <div>
                <label
                  htmlFor="res-occasion"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    marginBottom: '8px',
                  }}
                >
                  <Sparkles size={15} color="var(--accent-gold)" />
                  <span>Occasion (Optional)</span>
                </label>
                <select
                  id="res-occasion"
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '13px 15px',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem',
                    color: 'var(--text-main)',
                  }}
                >
                  <option value="Family Dining">Family Dining</option>
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Friends Gathering">Friends Gathering</option>
                  <option value="Business Lunch">Business Lunch</option>
                  <option value="Casual Dinner">Casual Dinner</option>
                </select>
              </div>
            </div>

            {/* Special Requests */}
            <div style={{ marginBottom: '24px' }}>
              <label
                htmlFor="res-notes"
                style={{
                  display: 'block',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  marginBottom: '8px',
                }}
              >
                Special Seating or Dietary Requests (Optional)
              </label>
              <textarea
                id="res-notes"
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. High chair needed for toddler, quiet corner table..."
                style={{
                  width: '100%',
                  padding: '13px 15px',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.9rem',
                  color: 'var(--text-main)',
                  resize: 'none',
                }}
              />
            </div>

            {/* Verification Notice Banner */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                padding: '14px 18px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(210, 172, 104, 0.08)',
                border: '1px solid var(--accent-border)',
                marginBottom: '28px',
              }}
            >
              <AlertCircle size={18} color="var(--accent-gold-soft)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                <strong style={{ color: 'var(--text-main)' }}>Reservation Request Notice:</strong>{' '}
                {restaurantConfig.notices.reservationStatus}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-whatsapp"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '0.98rem',
              }}
            >
              <MessageCircle size={19} />
              <span>Send Reservation Request on WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
