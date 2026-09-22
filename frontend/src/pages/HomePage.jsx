import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero shadow-ambient" id="home">
        <div className="hero__overlay" />
        <div className="hero__bg">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBmu50PRdM5TWmjEtfjQROf4o76XLO2AmfagElshohaEbSDeaV9FI6_etF_yajbogvGWL72fAm03uaOxcIR-47w4Uo3qUIlXedwIdSLBU0go_tlxR8L0pkFOUBKJ4tDF7YmywPfz_1NyclivFhK7tv136bV0ylrcKULmCdv6dIo8H7Mbw5tbferbTQY-ep0Je_TdC7_b7GTBraGxwH5rgvS880j-VGIHeZzB9ypWJCDVyCY6xwZ3bh-w"
            alt="Brew & Bloom specialty coffee cafe interior"
            className="hero__image"
          />
        </div>
        <div className="hero__content">
          <h1 className="display-lg-mobile hero__title">
            Handcrafted Coffee,<br />Made With Heart
          </h1>
          <p className="body-lg hero__subtitle">
            Experience the art of slow living with our meticulously sourced, small-batch roasted coffees in a space designed for tranquility.
          </p>
          <div className="hero__actions">
            <Link to="/menu" className="hero__btn hero__btn--outline">
              View Menu
            </Link>
            <Link to="/menu" className="hero__btn hero__btn--filled">
              Order Now
            </Link>
          </div>
        </div>
      </section>

      {/* Today's Special Preview */}
      <section className="home-special shadow-ambient" id="special">
        <div className="home-special__content">
          <div className="home-special__text">
            <div className="chip-green">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>stars</span>
              Today's Special ✨
            </div>
            <h2 className="headline-md home-special__name" style={{ color: 'var(--primary)' }}>
              Maple Pecan Latte
            </h2>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
              Embrace the season with our signature espresso blended with house-made maple syrup, toasted pecan bitters, and perfectly steamed oat milk. A cozy hug in a mug.
            </p>
            <div className="home-special__pricing">
              <span className="headline-sm" style={{ color: 'var(--terracotta)' }}>$5.50</span>
              <span className="body-md" style={{ color: 'var(--on-surface-variant)', textDecoration: 'line-through' }}>$7.00</span>
            </div>
            <p className="caption home-special__time">
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>schedule</span>
              Available till 6 PM
            </p>
            <Link to="/specials" className="btn-tertiary home-special__cta">
              Order This
            </Link>
          </div>

          <div className="home-special__image-wrap bloom-card">
            <div className="bloom-reveal" />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3bbserL4aQMeqDV1Sa_WBb7j3RJTahxwjr_EWq5liNwB9TN3EIQtSgDf4xORGxtv4mSHuo2uU0CMj9-VLMU2yT1M7pIIPs8ZWlTQn2790NxTkwleozZFlWZSGu9Dv_Qjq8wKt7sQaG97pEtHiQyzt8DdZ9ABu00ph2P5yxDeWYBQEs6r0vXqtup8XmVx_AoEA8PsyLr4pTX9R-i1JurvQgirldDUUVtMpkz8cKTRQ3C0tY0mI-LsSEw"
              alt="Maple Pecan Latte"
              className="home-special__img"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
