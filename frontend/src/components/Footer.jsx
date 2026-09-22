import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand-col">
          <Link to="/" className="footer__brand headline-md">
            Brew &amp; Bloom
          </Link>
          <p className="footer__tagline body-md">
            Crafting moments of pause through specialty coffee and botanical bakes.
          </p>
          <p className="footer__copyright caption">
            &copy; 2024 Brew &amp; Bloom. Crafted for slow living.
          </p>
        </div>

        <div className="footer__links-col">
          <h4 className="footer__heading label-md">Explore</h4>
          <ul className="footer__list">
            <li><Link to="/about" className="footer__link body-md">Sustainability</Link></li>
            <li><Link to="/about" className="footer__link body-md">Careers</Link></li>
          </ul>
        </div>

        <div className="footer__links-col">
          <h4 className="footer__heading label-md">Legal</h4>
          <ul className="footer__list">
            <li><a href="#" className="footer__link body-md">Privacy Policy</a></li>
            <li><a href="#" className="footer__link body-md">Terms of Service</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
