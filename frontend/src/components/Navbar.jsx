import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/about', label: 'About Us' },
    { to: '/specials', label: "Today's Special" },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="topNav">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand headline-sm">
          Brew &amp; Bloom
        </Link>

        <div className="navbar__links">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar__link label-md ${
                location.pathname === link.to ? 'navbar__link--active' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link to="/menu" className="navbar__cta btn-primary navbar__cta-desktop">
          Order Online
        </Link>

        <button
          className="navbar__mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {mobileOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${mobileOpen ? 'navbar__mobile-menu--open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`navbar__mobile-link label-md ${
              location.pathname === link.to ? 'navbar__link--active' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link to="/menu" className="btn-primary" style={{ textAlign: 'center', marginTop: '8px' }}>
          Order Online
        </Link>
      </div>
    </nav>
  );
}
