import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTodaysSpecial, subscribeNewsletter } from '../services/api';
import './SpecialsPage.css';

const FALLBACK_SPECIALS = {
  featured: {
    name: "Maple Pecan Latte",
    description: "Embrace the season with our handcrafted signature latte. We blend our ethically sourced, medium-roast house espresso with velvety steamed oat milk, real Vermont maple syrup, and a house-made toasted pecan purée. Finished with a dusting of cinnamon.",
    price: 6.50,
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCUWMOKQ7vFzvUxhkE6RAA1AAZYFI7me7ZE1le2cRRWpOLopQs3-wIzXooaBDU8Y6GOz8nGhQPk_uuxjEr_HBlZrZtZEg-1H9gFJrjhQEifjFFxPzENr4fvLNhlEdALvZBYUOqBVZP4CLAqJ2VgOvXg_hXUuGPXSl0wwY_x_1Nq7KomBXnMtxQipFEPpBIHi8fDkyNIj493RU9VSBJvtC2eaxv1f-tkRg9pVeZCQI4pQklnT70Be0Srg",
    available_until: "6 PM",
  },
  trending: [
    {
      name: "Lavender Earl Grey Scone",
      description: "Delicate, crumbly scones infused with organic Earl Grey tea and local lavender. Served warm.",
      price: 4.25,
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbL7QGUgEVE2B0HJyQNhmj_5wT6fuvYbBakKzXTIfYTfxYMEek_iIDmM2oJUlMmyCtlu8QfllW2RyVt-bzYLi3QQysxz-NstjSd8SgLAOaNxzXqqyoDkEeYuR150cm3Uo2lnoXlp5ld8ANSOf81rA-XQ9xWRVezGI9TSTa-5pA9drYIFxo3NbiUybmSXYSH2_zEcZMj4OrIy7dvQ7GaJlSJQLNWAkt6fluK4OJUV1IYEs9qxftV8UYNQ",
    },
    {
      name: "Yuzu Matcha Lemonade",
      description: "Ceremonial grade matcha layered over tart, refreshing yuzu lemonade. A perfect afternoon pick-me-up.",
      price: 5.50,
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdGNuZwFXvZgstcvf2SIJuo2XGpFQSjBTypVQgqXexsg7fX4-IaeUMlk8AXkiVBEG_5gEs3qLNQzb_hQJeYXN1viHQShOB_6WYX8YRbHQ-AmlH2tSG-ZprVOawSOovnoDY94aUJ4IjhtqOBUwQAvvLZZn2g3QoUIk9CFJORXTE72m0-_t26mMlRuyUhMKZspRHxrayvsqijHTuPiKd07mEyEkrrj6tbB_LcW2CgnVFwcjkXs-2rQZ5ZA",
    },
  ],
};

export default function SpecialsPage() {
  const [specials, setSpecials] = useState(null);
  const [email, setEmail] = useState('');
  const [subMessage, setSubMessage] = useState('');
  const [countdown, setCountdown] = useState({ h: '04', m: '28', s: '15' });

  useEffect(() => {
    fetchTodaysSpecial().then((data) => {
      if (data && data.length > 0) {
        setSpecials({
          featured: data[0],
          trending: data.slice(1),
        });
      } else {
        setSpecials(FALLBACK_SPECIALS);
      }
    });
  }, []);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        let s = parseInt(prev.s) - 1;
        let m = parseInt(prev.m);
        let h = parseInt(prev.h);
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 0; m = 0; s = 0; }
        return {
          h: String(h).padStart(2, '0'),
          m: String(m).padStart(2, '0'),
          s: String(s).padStart(2, '0'),
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    const result = await subscribeNewsletter(email);
    setSubMessage(result.message);
    if (result.success) setEmail('');
    setTimeout(() => setSubMessage(''), 5000);
  };

  if (!specials) return null;

  const { featured, trending } = specials;

  return (
    <div className="specials-page">
      {/* Featured Special */}
      <section className="specials-featured">
        <div className="specials-featured__image-wrap">
          <img
            src={featured.image_url}
            alt={featured.name}
            className="specials-featured__img"
          />
          <div className="chip-green specials-featured__badge">Today Only</div>
        </div>
        <div className="specials-featured__content">
          <h2 className="headline-sm" style={{ color: 'var(--on-surface-variant)' }}>The Daily Brew</h2>
          <h1 className="display-lg-mobile specials-featured__name">{featured.name}</h1>
          <p className="body-lg" style={{ color: 'var(--on-surface-variant)' }}>{featured.description}</p>
          <div className="specials-featured__meta">
            <div className="headline-md" style={{ color: 'var(--primary)' }}>${featured.price.toFixed(2)}</div>
            <div className="specials-featured__divider" />
            <div>
              <span className="caption" style={{ color: 'var(--outline)' }}>Offer Ends In:</span>
              <div className="specials-featured__countdown label-md">
                <span>{countdown.h}<span className="caption" style={{ color: 'var(--outline)', marginLeft: '2px' }}>h</span></span>
                <span>:</span>
                <span>{countdown.m}<span className="caption" style={{ color: 'var(--outline)', marginLeft: '2px' }}>m</span></span>
                <span>:</span>
                <span>{countdown.s}<span className="caption" style={{ color: 'var(--outline)', marginLeft: '2px' }}>s</span></span>
              </div>
            </div>
          </div>
          <button className="btn-primary specials-featured__cta">Add to Order</button>
        </div>
      </section>

      {/* Trending */}
      {trending.length > 0 && (
        <section className="specials-trending">
          <h3 className="headline-md specials-trending__title">Also Trending This Week</h3>
          <div className="specials-trending__grid">
            {trending.map((item, idx) => (
              <div className="specials-trending__card shadow-hover-effect" key={idx}>
                <div className="specials-trending__card-image-wrap">
                  <img src={item.image_url} alt={item.name} className="specials-trending__card-img" />
                </div>
                <div className="specials-trending__card-content">
                  <h4 className="headline-sm" style={{ color: 'var(--primary)' }}>{item.name}</h4>
                  <p className="body-md specials-trending__card-desc">{item.description}</p>
                  <div className="specials-trending__card-footer">
                    <span className="label-md" style={{ color: 'var(--primary)' }}>${item.price.toFixed(2)}</span>
                    <span className="material-symbols-outlined specials-trending__add-btn">add_circle</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="specials-newsletter">
        <span className="material-symbols-filled specials-newsletter__icon">local_cafe</span>
        <h3 className="headline-md specials-newsletter__title">Join the Coffee Club</h3>
        <p className="body-lg specials-newsletter__text">
          Subscribe to get early access to our seasonal specials, behind-the-scenes roasting stories, and an exclusive 10% off your next visit.
        </p>
        <form className="specials-newsletter__form" onSubmit={handleSubscribe}>
          <input
            type="email"
            className="input-field specials-newsletter__input"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="specials-newsletter__submit">Subscribe</button>
        </form>
        {subMessage && (
          <p className="caption specials-newsletter__message">{subMessage}</p>
        )}
        <p className="caption" style={{ color: 'var(--outline)', marginTop: '16px' }}>
          We respect your inbox. No spam, just slow living.
        </p>
      </section>
    </div>
  );
}
