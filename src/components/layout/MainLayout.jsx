import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

/**
 * MainLayout Component
 * Semantic wrapper providing persistent header, main content outlet, and footer.
 */
export default function MainLayout() {
  const location = useLocation();

  // Scroll to top on route change if not navigating to a hash anchor
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);
  return (
    <div className="min-h-screen flex flex-col bg-aura-warm-white text-aura-charcoal">
      {/* Skip to Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-aura-leaf-700 text-white px-4 py-2 rounded-lg shadow-card text-sm font-medium"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="flex-1 focus:outline-none">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
