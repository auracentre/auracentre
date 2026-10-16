import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Phone, Menu, X, Heart, Shield, Clock } from 'lucide-react';
import AuraLogo from '../common/AuraLogo';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Recovery Programs', path: '/programs' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full aura-glass border-b border-aura-leaf-100 transition-colors">
      {/* Top Notification / Helpline Bar for Immediate Care */}
      <div className="bg-aura-leaf-700 text-aura-warm-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aura-leaf-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-aura-leaf-300"></span>
            </span>
            <span>24/7 Confidential De-Addiction Support &amp; Medical Intake</span>
          </div>
          <div className="flex items-center gap-4 text-aura-warm-sand">
            <span className="hidden md:inline-flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> 100% Confidential
            </span>
            <a
              href="tel:+918000000000"
              className="inline-flex items-center gap-1.5 font-semibold text-aura-warm-white hover:text-aura-blush-200 transition-colors focus-visible:ring-1 focus-visible:ring-white"
            >
              <Phone className="w-3 h-3 text-aura-blush-300" />
              <span>Helpline: +91 98765 43210</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-aura-leaf-500 rounded-lg p-1 transition-opacity hover:opacity-95"
            aria-label="Aura - Return to homepage"
          >
            <AuraLogo variant="full" className="h-10 sm:h-12 w-auto" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-aura-leaf-100 text-aura-leaf-800 font-semibold'
                      : 'text-aura-charcoal-muted hover:text-aura-leaf-700 hover:bg-aura-leaf-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Call to Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#appointment"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold bg-aura-leaf-600 text-white shadow-soft hover:bg-aura-leaf-700 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-aura-leaf-600"
            >
              <Heart className="w-4 h-4 text-aura-blush-200" />
              <span>Get Help Today</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-aura-charcoal-muted hover:text-aura-leaf-700 hover:bg-aura-leaf-100/50 focus-visible:ring-2 focus-visible:ring-aura-leaf-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-aura-leaf-100 bg-aura-warm-white px-4 pt-3 pb-6 shadow-card animate-fadeIn">
          <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-aura-leaf-100 text-aura-leaf-800 font-semibold'
                      : 'text-aura-charcoal-muted hover:text-aura-leaf-700 hover:bg-aura-leaf-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-3 mt-2 border-t border-aura-leaf-100 flex flex-col gap-2">
              <a
                href="#appointment"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl text-sm font-semibold bg-aura-leaf-600 text-white shadow-soft"
              >
                Get Help Today
              </a>
              <a
                href="tel:+918000000000"
                className="w-full text-center py-2.5 rounded-xl text-sm font-medium text-aura-leaf-700 bg-aura-leaf-50 border border-aura-leaf-200 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-aura-blush-500" />
                <span>Call Helpline</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
