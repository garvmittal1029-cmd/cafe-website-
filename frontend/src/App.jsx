import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import SpecialsPage from './pages/SpecialsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

/* Scroll to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      {/* Artisanal texture overlay */}
      <div className="texture-overlay" />

      <Navbar />

      <main style={{ flexGrow: 1, paddingTop: '72px' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--section-gap)', paddingBottom: 'var(--section-gap)' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/specials" element={<SpecialsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
