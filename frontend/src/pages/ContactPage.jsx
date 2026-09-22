import { useState } from 'react';
import { submitContact } from '../services/api';
import './ContactPage.css';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    const result = await submitContact(form);
    setStatus(result.message);
    if (result.success) setForm({ name: '', email: '', message: '' });
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <section className="contact-page__header animate-fade-in-up">
        <h1 className="display-lg-mobile contact-page__title">Say Hello</h1>
        <p className="body-lg contact-page__subtitle">
          We'd love to hear from you. Whether you have a question about our menu, want to book an event, or just want to say hi.
        </p>
      </section>

      {/* Main Content */}
      <div className="contact-page__grid">
        {/* Left: Info & Map */}
        <div className="contact-page__info">
          {/* Map placeholder */}
          <div className="contact-page__map" style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDyG7oNyHmp2NmZy9baeHKTEarzS_QGD2efXuZIfBCekadpNWxH0-qZ79NqP8t5gAaCeLhlCZCkDIt-ydD3yf-YdzAzRlQc0oRwyjLJGK-hajEZgKq6jdro4vxo6xWPFMKF9W2KBab4HUyqtU-VaiQMyJSE2QublWOdWMUWMx8QDEZknwMRBL2VwM4Q3APcX2FCY_3vdMOAw-LCfCwqtbFGVqcgWrNwCazKgdPwN26vTppWxClr2WcqGg')`
          }}>
            <div className="contact-page__map-overlay">
              <span className="material-symbols-outlined" style={{ fontSize: '36px', color: 'var(--primary)' }}>location_on</span>
            </div>
          </div>

          {/* Info Cards */}
          <div className="contact-page__info-grid">
            <div className="contact-page__info-item">
              <h3 className="headline-sm contact-page__info-heading">
                <span className="material-symbols-filled" style={{ color: 'var(--tertiary-container)' }}>storefront</span>
                Visit Us
              </h3>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>123 Artisan Alley</p>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>Portland, OR 97204</p>
            </div>
            <div className="contact-page__info-item">
              <h3 className="headline-sm contact-page__info-heading">
                <span className="material-symbols-filled" style={{ color: 'var(--tertiary-container)' }}>schedule</span>
                Hours
              </h3>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>Mon-Fri: 7am - 7pm</p>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>Sat-Sun: 8am - 8pm</p>
            </div>
            <div className="contact-page__info-item contact-page__info-item--full">
              <h3 className="headline-sm contact-page__info-heading">
                <span className="material-symbols-filled" style={{ color: 'var(--tertiary-container)' }}>call</span>
                Get in Touch
              </h3>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>(555) 123-4567</p>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>hello@brewandbloom.com</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="contact-page__social">
            <span className="label-md" style={{ color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Follow our journey:
            </span>
            <a href="#" className="contact-page__social-btn">
              <span className="material-symbols-outlined">photo_camera</span>
            </a>
            <a href="#" className="contact-page__social-btn">
              <span className="material-symbols-outlined">share</span>
            </a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="contact-page__form-wrap">
          <h2 className="headline-md" style={{ color: 'var(--primary)', marginBottom: '24px' }}>Send a Message</h2>
          <form className="contact-page__form" onSubmit={handleSubmit}>
            <div className="contact-page__field">
              <label className="label-md" htmlFor="contact-name" style={{ color: 'var(--primary)' }}>Your Name</label>
              <input
                className="input-field"
                type="text"
                id="contact-name"
                name="name"
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-page__field">
              <label className="label-md" htmlFor="contact-email" style={{ color: 'var(--primary)' }}>Email Address</label>
              <input
                className="input-field"
                type="email"
                id="contact-email"
                name="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-page__field contact-page__field--grow">
              <label className="label-md" htmlFor="contact-message" style={{ color: 'var(--primary)' }}>Message</label>
              <textarea
                className="input-field contact-page__textarea"
                id="contact-message"
                name="message"
                placeholder="How can we help you?"
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="contact-page__submit">
              <span>Send Message</span>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>send</span>
            </button>
            {status && (
              <p className="body-md contact-page__status">{status}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
