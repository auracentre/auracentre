import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import auraLogoImg from '../../assets/logo/aura-logo-transparent.png';

/**
 * Header Component — Aura RR De-Addiction Center
 *
 * Design Direction:
 * - Premium, editorial-style centered brand layout.
 * - Symmetrical 3-column architecture (Left Nav | Center Logo | Right Nav & CTA).
 * - Warm Ivory (#FAF9F4) backdrop with Forest Green (#43583C) and Botanical Green (#91B978).
 * - Dynamic scroll compression after 50px of scroll.
 * - Smooth micro-animations for link hover underlines.
 * - Responsive mobile view with true logo centering and accessible dropdown.
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Left navigation links
  const leftNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Approach', path: '/approach' },
  ];

  // Right navigation links
  const rightNavLinks = [
    { name: 'Programs', path: '/programs' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Contact', path: '/contact' },
  ];

  const allNavLinks = [...leftNavLinks, ...rightNavLinks];

  // Scroll listener for sticky navbar height and elevation compression
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close mobile dropdown
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ease-in-out select-none ${
        isScrolled
          ? 'bg-[#FAF9F4]/95 backdrop-blur-md py-3 shadow-[0_4px_20px_-4px_rgba(67,88,60,0.06)] border-b border-[#91B978]/25'
          : 'bg-[#FAF9F4] py-5 sm:py-6 border-b border-[#91B978]/15'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Single-Row 3-Column Grid Layout */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center w-full">
          {/* LEFT NAVIGATION */}
          <nav
            className="flex items-center justify-start gap-8 xl:gap-10"
            aria-label="Primary Navigation Left"
          >
            {leftNavLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group relative py-1 text-sm font-medium tracking-wide transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#91B978] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF9F4] rounded-sm ${
                    isActive
                      ? 'text-[#43583C] font-semibold'
                      : 'text-[#43583C] hover:text-[#91B978]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.name}</span>
                    {/* Animated Underline Indicator */}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] w-full bg-[#91B978] rounded-full transition-transform duration-200 ease-out origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CENTER: Actual Aura Logo (Geometrically Centered) */}
          <div className="flex items-center justify-center px-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center transition-transform duration-300 ease-in-out hover:opacity-90 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#91B978] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAF9F4] rounded-lg"
              aria-label="Aura – For Better Life Home"
            >
              <img
                src={auraLogoImg}
                alt="Aura – For Better Life"
                className={`w-auto object-contain transition-all duration-300 ease-in-out ${
                  isScrolled ? 'h-9 sm:h-10' : 'h-11 sm:h-12'
                }`}
                loading="eager"
              />
            </Link>
          </div>

          {/* RIGHT NAVIGATION & GET HELP CTA */}
          <div className="flex items-center justify-end gap-7 xl:gap-8">
            <nav
              className="flex items-center gap-7 xl:gap-8"
              aria-label="Primary Navigation Right"
            >
              {rightNavLinks.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `group relative py-1 text-sm font-medium tracking-wide transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#91B978] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF9F4] rounded-sm ${
                      isActive
                        ? 'text-[#43583C] font-semibold'
                        : 'text-[#43583C] hover:text-[#91B978]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.name}</span>
                      {/* Animated Underline Indicator */}
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] w-full bg-[#91B978] rounded-full transition-transform duration-200 ease-out origin-left ${
                          isActive
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Primary Action Button: Get Help */}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold tracking-wide text-white bg-[#91B978] hover:bg-[#7EAA64] active:scale-[0.97] transition-all duration-180 shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#91B978] focus-visible:ring-offset-[#FAF9F4]"
            >
              Get Help
            </Link>
          </div>
        </div>

        {/* Mobile Viewport Header (Logo Centered + Symmetrical Toggle) */}
        <div className="flex lg:hidden items-center justify-between w-full">
          {/* Symmetrical Left Spacer to ensure true geometric center for logo */}
          <div className="w-10 h-10 shrink-0" aria-hidden="true" />

          {/* Center Logo */}
          <Link
            to="/"
            className="flex items-center justify-center transition-transform active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#91B978] rounded-lg"
            aria-label="Aura – For Better Life Home"
          >
            <img
              src={auraLogoImg}
              alt="Aura – For Better Life"
              className={`w-auto object-contain transition-all duration-300 ${
                isScrolled ? 'h-9' : 'h-10'
              }`}
              loading="eager"
            />
          </Link>

          {/* Right Mobile Menu Toggle */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#43583C] hover:text-[#91B978] hover:bg-[#91B978]/10 transition-colors focus-visible:ring-2 focus-visible:ring-[#91B978]"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#43583C]" />
            ) : (
              <Menu className="w-5 h-5 text-[#43583C]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Panel */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-nav-panel"
          className="lg:hidden absolute top-full left-0 w-full bg-[#FAF9F4] border-b border-[#91B978]/25 shadow-lg px-6 pt-4 pb-6 animate-nav-dropdown"
        >
          <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
            {allNavLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#91B978]/15 text-[#43583C] font-semibold'
                      : 'text-[#43583C] hover:text-[#91B978] hover:bg-[#91B978]/10'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className="pt-3 mt-2 border-t border-[#91B978]/20 flex flex-col gap-2.5">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-full text-sm font-semibold tracking-wide text-white bg-[#91B978] hover:bg-[#7EAA64] active:scale-[0.98] transition-all shadow-sm"
              >
                Get Help
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
