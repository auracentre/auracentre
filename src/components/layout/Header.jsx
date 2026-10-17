import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import auraLogoImg from '../../assets/logo/aura-logo-transparent.png';

/**
 * Header Component — Aura RR De-Addiction Center
 *
 * Space-Optimized Centered-Brand Navigation:
 * - Full-width distribution: Left navigation spans the left half; Right navigation spans the right half.
 * - Geometric center: Aura logo is mathematically centered in the middle column.
 * - Warm Ivory (#FAF9F4) backdrop with Forest Green (#43583C) and Botanical Green (#91B978).
 * - Sized logo (h-14 to h-16) with sleek compact navbar height.
 * - Micro-interactions: Animated underline on hover, visible keyboard focus.
 * - Fully responsive mobile drawer with true geometric center.
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
          ? 'bg-[#FAF9F4]/95 backdrop-blur-md py-1.5 sm:py-2 shadow-[0_4px_20px_-4px_rgba(67,88,60,0.06)] border-b border-[#91B978]/25'
          : 'bg-[#FAF9F4] py-2.5 sm:py-3.5 border-b border-[#91B978]/15'
      }`}
    >
      <div className="w-full px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-24">
        {/* Desktop Single-Row 3-Column Layout with Full Space Distribution */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center w-full">
          {/* LEFT HALF: Evenly distributed across the entire left side */}
          <nav
            className="flex items-center justify-between w-full pr-8 xl:pr-14 2xl:pr-20"
            aria-label="Primary Navigation Left"
          >
            {leftNavLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group relative py-1 text-sm font-medium tracking-wide transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#91B978] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF9F4] rounded-sm whitespace-nowrap ${
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

          {/* CENTER: Actual Aura Logo (Geometrically Centered & Prominent) */}
          <div className="flex items-center justify-center px-6 xl:px-10 shrink-0">
            <Link
              to="/"
              className="inline-flex items-center justify-center transition-transform duration-300 ease-in-out hover:opacity-95 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#91B978] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAF9F4] rounded-lg"
              aria-label="Aura – For Better Life Home"
            >
              <img
                src={auraLogoImg}
                alt="Aura – For Better Life"
                className={`w-auto object-contain transition-all duration-300 ease-in-out ${
                  isScrolled ? 'h-10 sm:h-11' : 'h-14 sm:h-16 lg:h-[4.25rem]'
                }`}
                loading="eager"
              />
            </Link>
          </div>

          {/* RIGHT HALF: Evenly distributed across the entire right side */}
          <div className="flex items-center justify-between w-full pl-8 xl:pl-14 2xl:pl-20">
            {rightNavLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group relative py-1 text-sm font-medium tracking-wide transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#91B978] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF9F4] rounded-sm whitespace-nowrap ${
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

            {/* Primary Action Button: Get Help */}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold tracking-wide text-white bg-[#91B978] hover:bg-[#7EAA64] active:scale-[0.97] transition-all duration-180 shadow-sm whitespace-nowrap focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#91B978] focus-visible:ring-offset-[#FAF9F4]"
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
                isScrolled ? 'h-9 sm:h-10' : 'h-11 sm:h-13'
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
