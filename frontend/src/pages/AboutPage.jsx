import './AboutPage.css';

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero__bg" style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQ3trIrROqrDzv6__SfY63UPW3jXEbgd_DNjOB-LPizdBuPx5S6r5IKG2CrxMPqm7YUKPyLpCRSK4GT2155vUtYllnRjJV-aFKPk-PQc7ePmq-wgo4D72v3H_ZF06QRevpclLkPUvdEbXywaPYMvv-hvWErfnaXWxX4YQhZlvsQhx4wRK67OZxjnb4PIKtvDOB3hoTUNAnw7ps6MAlK9mcRDQdcVzHwvkHz-waBYOc90dZ_rVufq9rHQ')`
        }} />
        <div className="about-hero__content animate-fade-in-up">
          <span className="caption about-hero__label">Our Story</span>
          <h1 className="display-lg-mobile about-hero__title">
            Cultivating connection through exceptional coffee and botanical warmth.
          </h1>
          <p className="body-lg about-hero__subtitle">
            Brew &amp; Bloom began as a simple idea: that the deliberate pace of a well-crafted morning routine can transform the day. We are roasters, bakers, and curators of slow living.
          </p>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="about-founder">
        <div className="about-founder__grid">
          <div className="about-founder__text">
            <h2 className="headline-md about-founder__heading">The Journey to the Perfect Cup</h2>
            <p className="body-md about-founder__para">
              Founder Elena Rostova spent a decade exploring the world's most remote coffee farms before settling down to build a sanctuary for slow living. Her vision was never just about the bean—it was about the hands that harvested it, the soil that nurtured it, and the moment it brings comfort to someone's day.
            </p>
            <p className="body-md about-founder__para">
              Combining her expertise in specialty roasting with her passion for artisanal, botanical-infused baking, Brew &amp; Bloom was born as a physical manifestation of mindfulness and quality craftsmanship.
            </p>
            <div className="about-founder__author">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJlsnTc4eM5c_8eKiQtfSG1Rizi83oZZDosOxibgGNK8lGkngtaOHPLP9-DB70_xeQuOlVT_8YOu1tdwwr8iPelmjVZ-C0GXoRK8r1RAEXfrxjLKiZfgfxMaUeDM3iNt8PBM-NjXwwLmLXEB3jYEML6DBioawJwDZ8-lEMUf6g5b8xKSfwgDUGBg7yyRl63iyTBTb9PvSTaTEhSiZ-dYUWHC6L-I4gRv16-R-cuTQK8bWfv0Kh-CJLEA"
                alt="Elena Rostova"
                className="about-founder__avatar"
              />
              <div>
                <p className="label-md" style={{ color: 'var(--primary)' }}>Elena Rostova</p>
                <p className="caption" style={{ color: 'var(--on-surface-variant)' }}>Founder &amp; Master Roaster</p>
              </div>
            </div>
          </div>

          <div className="about-founder__image-col">
            <div className="about-founder__image-wrap">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCURFikc4yfws-7-rZ3H4CCJgSPjzjZ6xwAYPWM5wRXFX05PbDks1hluvwPu1ggeVCgK8kQQzTxc92DcvcuPrN4rm9LeRXUsJOILecNNoVBqSHalg_OiVwbsmfC0WRHPGhTHT7gvsl9w6K4TKqFR8YmJ3iZuPDdUDhEMSm_JPjf33Fdao3HJMOJp8NwxR944qQFcx_yXy4BtCi7cb5F3eQKn3T-yu_zzkf4uYPx8mWsKU0kjgr56Nto8g"
                alt="Pour-over coffee preparation"
                className="about-founder__img"
              />
            </div>
            <div className="about-founder__bloom-circle" />
          </div>
        </div>
      </section>
    </div>
  );
}
