import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import auraLogoImg from '../../assets/logo/aura-logo-transparent.png';

/**
 * Header Component — Aura De-Addiction Center
 *
 * Space-Optimized Centered-Brand Navigation:
 * - Full-width distribution: Left navigation spans the left half; Right navigation spans the right half.
 * - Geometric center: Aura logo is mathematically centered in the middle column.
 * - Pure White (#FFFFFF) backdrop with Forest Green (#43583C) and Botanical Green (#91B978).
 * - Sized logo (h-14 to h-16) with sleek compact navbar height.
 * - Micro-interactions: Animated underline on hover, visible keyboard focus.
 * - Fully responsive mobile drawer with true geometric center.
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Left navigation links
  const leftNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/#about-aura' },
    { name: 'What We Treat', path: '/#what-we-treat' },
    { name: 'Crew', path: '/doctors' },
  ];

  // Right navigation links
  const rightNavLinks = [
    { name: 'Our Services', path: '/#our-services' },
    { name: 'Why Choose Us', path: '/#why-choose-us' },
    { name: 'Gallery', path: '/gallery' },
  ];

  const allNavLinks = [...leftNavLinks, ...rightNavLinks];

  // Scroll spy to dynamically toggle active link between 'Home', 'About Us', 'What We Treat', 'Our Services', and 'Why Choose Us'
  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    const updateActiveSection = () => {
      const aboutEl = document.getElementById('about-aura');
      const treatEl = document.getElementById('what-we-treat');
      const servicesEl = document.getElementById('our-services');
      const whyUsEl = document.getElementById('why-choose-us');
      const contactEl = document.getElementById('contact');
      const triggerThreshold = Math.max(260, Math.floor(window.innerHeight * 0.45));

      const contactRect = contactEl?.getBoundingClientRect();
      const whyUsRect = whyUsEl?.getBoundingClientRect();
      const servicesRect = servicesEl?.getBoundingClientRect();
      const treatRect = treatEl?.getBoundingClientRect();
      const aboutRect = aboutEl?.getBoundingClientRect();

      if (contactRect && contactRect.top <= triggerThreshold) {
        setActiveSection('contact');
      } else if (whyUsRect && whyUsRect.top <= triggerThreshold) {
        setActiveSection('why-us');
      } else if (servicesRect && servicesRect.top <= triggerThreshold) {
        setActiveSection('services');
      } else if (treatRect && treatRect.top <= triggerThreshold) {
        setActiveSection('treat');
      } else if (aboutRect && aboutRect.top <= triggerThreshold) {
        setActiveSection('about');
      } else {
        setActiveSection('home');
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });
    window.addEventListener('hashchange', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
      window.removeEventListener('hashchange', updateActiveSection);
    };
  }, [location.pathname]);

  // Determine if a navigation link should have the active highlighted style
  const isItemActive = (item) => {
    if (location.pathname !== '/') {
      return location.pathname === item.path;
    }

    if (item.name === 'Why Choose Us') {
      return activeSection === 'why-us';
    }
    if (item.name === 'Our Services') {
      return activeSection === 'services';
    }
    if (item.name === 'What We Treat') {
      return activeSection === 'treat';
    }
    if (item.name === 'About Us') {
      return activeSection === 'about';
    }
    if (item.name === 'Home') {
      return activeSection === 'home';
    }
    if (item.name === 'Crew' || item.name === 'Doctors') {
      return location.pathname === '/doctors' || location.pathname === '/crew';
    }
    if (item.name === 'Gallery') {
      return location.pathname === '/gallery';
    }

    return false;
  };

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
          ? 'bg-white/95 backdrop-blur-md py-1 sm:py-1.5 shadow-[0_4px_20px_-4px_rgba(67,88,60,0.06)] border-b border-[#E8ECE4]'
          : 'bg-white py-1.5 sm:py-2.5 border-b border-[#E8ECE4]'
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        {/* Desktop Single-Row 3-Column Layout with Full Space Distribution */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center w-full">
          {/* LEFT HALF: Evenly distributed across the entire left side */}
          <nav
            className="flex items-center justify-between w-full pr-5 xl:pr-10 2xl:pr-16 gap-2 xl:gap-4"
            aria-label="Primary Navigation Left"
          >
            {leftNavLinks.map((item) => {
              const isAboutLink = item.path.includes('#about-aura');
              const isTreatLink = item.path.includes('#what-we-treat');
              const isHomeLink = item.path === '/';
              const active = isItemActive(item);

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={(e) => {
                    if (isAboutLink && window.location.pathname === '/') {
                      e.preventDefault();
                      const el = document.getElementById('about-aura');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', '/#about-aura');
                        setActiveSection('about');
                      }
                    } else if (isTreatLink && window.location.pathname === '/') {
                      e.preventDefault();
                      const el = document.getElementById('what-we-treat');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', '/#what-we-treat');
                        setActiveSection('treat');
                      }
                    } else if (isHomeLink && window.location.pathname === '/') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      window.history.pushState(null, '', '/');
                      setActiveSection('home');
                    }
                  }}
                  className={`group relative py-1 text-xs xl:text-sm font-medium tracking-wide transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#91B978] focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm whitespace-nowrap ${
                    active
                      ? 'text-[#43583C] font-semibold'
                      : 'text-[#43583C] hover:text-[#91B978]'
                  }`}
                >
                  <span>{item.name}</span>
                  {/* Animated Underline Indicator */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-full bg-[#91B978] rounded-full transition-transform duration-200 ease-out origin-left ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </NavLink>
              );
            })}
          </nav>

          {/* CENTER: Actual Aura Logo (Geometrically Centered & Prominent) */}
          <div className="flex items-center justify-center px-4 xl:px-8 shrink-0">
            <Link
              to="/"
              className="inline-flex items-center justify-center transition-transform duration-300 ease-in-out hover:opacity-95 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#91B978] focus-visible:ring-offset-4 focus-visible:ring-offset-white rounded-lg"
              aria-label="Aura – For Better Life Home"
            >
              <img
                src={auraLogoImg}
                alt="Aura – For Better Life"
                className={`w-auto object-contain transition-all duration-300 ease-in-out ${
                  isScrolled ? 'h-9 sm:h-10' : 'h-11 sm:h-12 lg:h-[50px]'
                }`}
                loading="eager"
              />
            </Link>
          </div>

          {/* RIGHT HALF: Evenly distributed across the entire right side */}
          <div className="flex items-center justify-between w-full pl-5 xl:pl-10 2xl:pl-16 gap-2 xl:gap-4">
            {rightNavLinks.map((item) => {
              const isServicesLink = item.path.includes('#our-services');
              const isWhyUsLink = item.path.includes('#why-choose-us');
              const active = isItemActive(item);
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={(e) => {
                    if (isServicesLink && window.location.pathname === '/') {
                      e.preventDefault();
                      const el = document.getElementById('our-services');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', '/#our-services');
                        setActiveSection('services');
                      }
                    } else if (isWhyUsLink && window.location.pathname === '/') {
                      e.preventDefault();
                      const el = document.getElementById('why-choose-us');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', '/#why-choose-us');
                        setActiveSection('why-us');
                      }
                    }
                  }}
                  className={`group relative py-1 text-xs xl:text-sm font-medium tracking-wide transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#91B978] focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm whitespace-nowrap ${
                    active
                      ? 'text-[#43583C] font-semibold'
                      : 'text-[#43583C] hover:text-[#91B978]'
                  }`}
                >
                  <span>{item.name}</span>
                  {/* Animated Underline Indicator */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-full bg-[#91B978] rounded-full transition-transform duration-200 ease-out origin-left ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </NavLink>
              );
            })}

            {/* Primary Action Button: Get Help */}
            <Link
              to="/#contact"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  const el = document.getElementById('contact');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', '/#contact');
                    setActiveSection('contact');
                  }
                }
              }}
              className="inline-flex items-center justify-center px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-[#43583C] hover:bg-[#34462E] active:scale-[0.97] transition-all duration-180 shadow-sm whitespace-nowrap focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#43583C] focus-visible:ring-offset-white"
            >
              Get Help
            </Link>
          </div>
        </div>

        {/* Mobile Viewport Header (Logo Centered + Symmetrical Toggle) */}
        <div className="flex lg:hidden items-center justify-between w-full">
          {/* Symmetrical Left Spacer to ensure true geometric center for logo */}
          <div className="w-9 h-9 shrink-0" aria-hidden="true" />

          {/* Center Logo */}
          <Link
            to="/"
            className="flex items-center justify-center transition-transform active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#91B978] rounded-lg"
            aria-label="Aura – For Better Life Home"
          >
            <img
              src={auraLogoImg}
              alt="Aura – For Better Life"
              className={`w-auto object-contain max-w-[160px] transition-all duration-300 ${
                isScrolled ? 'h-7 sm:h-8' : 'h-[36px] sm:h-10'
              }`}
              loading="eager"
            />
          </Link>

          {/* Right Mobile Menu Toggle */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full text-[#43583C] hover:text-[#91B978] hover:bg-[#91B978]/10 transition-colors focus-visible:ring-2 focus-visible:ring-[#91B978]"
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
          className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-[#E8ECE4] shadow-xl px-5 pt-4 pb-6 animate-nav-dropdown max-h-[calc(100vh-60px)] overflow-y-auto"
        >
          <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
            {allNavLinks.map((item) => {
              const isAboutLink = item.path.includes('#about-aura');
              const isTreatLink = item.path.includes('#what-we-treat');
              const isServicesLink = item.path.includes('#our-services');
              const isWhyUsLink = item.path.includes('#why-choose-us');
              const isHomeLink = item.path === '/';
              const active = isItemActive(item);

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (isAboutLink && window.location.pathname === '/') {
                      e.preventDefault();
                      const el = document.getElementById('about-aura');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', '/#about-aura');
                        setActiveSection('about');
                      }
                    } else if (isTreatLink && window.location.pathname === '/') {
                      e.preventDefault();
                      const el = document.getElementById('what-we-treat');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', '/#what-we-treat');
                        setActiveSection('treat');
                      }
                    } else if (isServicesLink && window.location.pathname === '/') {
                      e.preventDefault();
                      const el = document.getElementById('our-services');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', '/#our-services');
                        setActiveSection('services');
                      }
                    } else if (isWhyUsLink && window.location.pathname === '/') {
                      e.preventDefault();
                      const el = document.getElementById('why-choose-us');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', '/#why-choose-us');
                        setActiveSection('why-us');
                      }
                    } else if (isHomeLink && window.location.pathname === '/') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      window.history.pushState(null, '', '/');
                      setActiveSection('home');
                    }
                  }}
                  className={`px-3.5 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    active
                      ? 'bg-[#91B978]/15 text-[#43583C] font-semibold'
                      : 'text-[#43583C] hover:text-[#91B978] hover:bg-[#91B978]/10'
                  }`}
                >
                  {item.name}
                </NavLink>
              );
            })}

            <div className="pt-3 mt-2 border-t border-[#E8ECE4] flex flex-col gap-2.5">
              <Link
                to="/#contact"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    const el = document.getElementById('contact');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                      window.history.pushState(null, '', '/#contact');
                      setActiveSection('contact');
                    }
                  }
                }}
                className="w-full text-center py-3 rounded-full text-sm font-semibold tracking-wide text-white bg-[#43583C] hover:bg-[#34462E] active:scale-[0.98] transition-all shadow-sm"
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
