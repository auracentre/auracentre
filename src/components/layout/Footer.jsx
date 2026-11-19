import React, { useState, useEffect } from 'react';
import { Phone, MapPin, X, ArrowUpRight } from 'lucide-react';
import AuraLogo from '../common/AuraLogo';
import contactService from '../../services/contactService';
import { useMotionPreference } from '../../hooks/useMotionPreference';

const CURRENT_YEAR = new Date().getFullYear();

function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YoutubeIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/auradeaddictioncentre?srtk=ZndhbXFkNmZzOGJi&utm_source=qr',
    icon: InstagramIcon,
    label: 'Follow Aura De-Addiction Centre on Instagram (opens in new tab)',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1K8zESxg7J/?mibextid=wwXIfr',
    icon: FacebookIcon,
    label: 'Follow Aura De-Addiction Centre on Facebook (opens in new tab)',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@auradeaddictioncentre?si=fns1ebrmv29kcf6o',
    icon: YoutubeIcon,
    label: 'Subscribe to Aura De-Addiction Centre on YouTube (opens in new tab)',
  },
];

const EXPLORE_LINKS = [
  { name: 'Home', target: 'home' },
  { name: 'About Us', target: 'about-aura' },
  { name: 'What We Treat', target: 'what-we-treat' },
  { name: 'Doctors', path: '/doctors' },
  { name: 'Our Services', target: 'our-services' },
  { name: 'Why Choose Us', target: 'why-choose-us' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', target: 'contact' },
];

/**
 * Footer Component — Aura De-Addiction Centre ("For Better Life")
 *
 * Premium, minimal, trustworthy healthcare footer.
 *
 * Architecture:
 * - Part A: Brand Identity with prominent Aura logo in white and restrained supporting copy.
 * - Part B: Clean Columns (Explore section navigation and dynamic database-driven Get in Touch).
 * - Part C: Bottom Legal Bar with dynamic copyright year and accessible Privacy / Terms modals.
 */
export default function Footer() {
  const prefersReducedMotion = useMotionPreference();

  // Dynamic Contact Data State
  const [contactStatus, setContactStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [branches, setBranches] = useState([]);

  // Legal Modal State ('privacy' | 'terms' | null)
  const [legalModal, setLegalModal] = useState(null);

  // Fetch verified branch contact info from dynamic service layer
  useEffect(() => {
    let isMounted = true;

    async function loadContactDetails() {
      try {
        const data = await contactService.getContactData();
        if (!isMounted) return;

        if (Array.isArray(data?.branches) && data.branches.length > 0) {
          setBranches(data.branches);
          setContactStatus('success');
        } else {
          setContactStatus('error');
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('[Footer] Failed to load contact information:', err);
        setContactStatus('error');
      }
    }

    loadContactDetails();

    return () => {
      isMounted = false;
    };
  }, []);

  // Keyboard Escape listener for legal modal
  useEffect(() => {
    if (!legalModal) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLegalModal(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [legalModal]);

  // Smooth navigation handler to existing website sections or dedicated pages
  const handleNavigateSection = (link) => {
    if (typeof window === 'undefined') return;

    if (link.path) {
      window.location.assign(link.path);
      return;
    }

    const sectionId = link.target;
    if (window.location.pathname === '/') {
      if (!sectionId || sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
        return;
      }
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/#${sectionId}`);
      }
    } else {
      const targetUrl = !sectionId || sectionId === 'home' ? '/' : `/#${sectionId}`;
      window.location.assign(targetUrl);
    }
  };

  return (
    <footer
      aria-labelledby="footer-heading"
      className="w-full bg-[#203D2E] text-[#FAF9F4] select-none border-t border-[#FAF9F4]/10 transition-colors"
    >
      <h2 id="footer-heading" className="sr-only">
        Aura Clinic Footer
      </h2>

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-10 sm:pt-12 md:pt-14 pb-5 sm:pb-6">
        {/* =========================================================
            COLUMNS: Brand Identity, Explore, and Get in Touch
           ========================================================= */}
        <div className="pb-8 sm:pb-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 xl:gap-16">
          {/* Column 1: Brand Identity */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col items-start">
            <AuraLogo variant="full" tone="white" size="lg" className="w-auto" />

            <p className="font-serif italic text-base sm:text-lg text-[#FAF9F4]/85 mt-5 sm:mt-6 font-normal leading-relaxed max-w-sm">
              Recovery, dignity and a renewed life.
            </p>

            <p className="font-sans text-xs sm:text-sm text-[#FAF9F4]/60 mt-2.5 sm:mt-3 leading-relaxed max-w-sm">
              Aura De-Addiction Centre is dedicated to compassionate, science-backed rehabilitation, healing minds and restoring lasting wellness.
            </p>

            {/* Follow Us Social Links */}
            <div className="mt-6 sm:mt-7 pt-5 border-t border-[#FAF9F4]/10 w-full max-w-sm">
              <span className="block font-sans text-xs font-semibold tracking-[0.24em] text-[#A8C99C] uppercase mb-3.5">
                FOLLOW US
              </span>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#FAF9F4]/10 hover:bg-[#FAF9F4] text-[#FAF9F4] hover:text-[#203D2E] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-xs border border-[#FAF9F4]/15 hover:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C99C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#203D2E]"
                      aria-label={item.label}
                      title={`Follow us on ${item.name}`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: EXPLORE Navigation */}
          <nav
            aria-label="Footer Explore Navigation"
            className="md:col-span-3 lg:col-span-3 flex flex-col"
          >
            <h4 className="font-sans text-xs font-semibold tracking-[0.24em] text-[#A8C99C] uppercase mb-4 sm:mb-5">
              EXPLORE
            </h4>
            <ul className="flex flex-col gap-2.5 sm:gap-3 text-sm">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.name}>
                  <button
                    type="button"
                    onClick={() => handleNavigateSection(link)}
                    className={`group inline-flex items-center gap-2 text-[#FAF9F4]/75 hover:text-[#FAF9F4] text-left focus-visible:outline-none focus-visible:underline cursor-pointer ${
                      prefersReducedMotion ? '' : 'transition-colors duration-200'
                    }`}
                  >
                    <span
                      className={
                        prefersReducedMotion ? '' : 'transition-transform duration-200 group-hover:translate-x-1'
                      }
                    >
                      {link.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: GET IN TOUCH (Dynamic Database Data Source) */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col">
            <h4 className="font-sans text-xs font-semibold tracking-[0.24em] text-[#A8C99C] uppercase mb-5 sm:mb-6">
              GET IN TOUCH
            </h4>

            {/* Loading State: Subtle, Unobtrusive Shimmer */}
            {contactStatus === 'loading' && (
              <div
                className="space-y-5 animate-pulse"
                aria-busy="true"
                aria-label="Loading verified centre details"
              >
                <div className="space-y-2">
                  <div className="h-3 w-32 bg-[#FAF9F4]/10 rounded" />
                  <div className="h-3 w-52 bg-[#FAF9F4]/10 rounded" />
                  <div className="h-3 w-36 bg-[#FAF9F4]/10 rounded" />
                </div>
                <div className="space-y-2 pt-1">
                  <div className="h-3 w-28 bg-[#FAF9F4]/10 rounded" />
                  <div className="h-3 w-48 bg-[#FAF9F4]/10 rounded" />
                  <div className="h-3 w-36 bg-[#FAF9F4]/10 rounded" />
                </div>
              </div>
            )}

            {/* Error State: Graceful Feedback */}
            {contactStatus === 'error' && (
              <div className="text-xs text-[#FAF9F4]/65 space-y-2.5">
                <p>Contact information temporarily unavailable.</p>
                <a
                  href="tel:7418661994"
                  className="inline-flex items-center gap-2 text-[#A8C99C] hover:text-[#FAF9F4] transition-colors font-medium"
                  aria-label="Call Main Helpline at 7418661994"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Call Main Helpline: +91 74186 61994</span>
                </a>
              </div>
            )}

            {/* Success State: Verified Dynamic Branch Locations */}
            {contactStatus === 'success' && branches.length > 0 && (
              <address className="not-italic flex flex-col gap-6 text-xs text-[#FAF9F4]/75">
                {branches.map((branch) => (
                  <div key={branch.id} className="space-y-2">
                    <span className="font-sans text-xs font-semibold tracking-wider text-[#FAF9F4] uppercase block">
                      {branch.name}
                    </span>

                    {/* Address with functional map link if available */}
                    <div className="flex items-start gap-2.5">
                      <MapPin
                        className="w-3.5 h-3.5 text-[#A8C99C] mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      {branch.directionsUrl ? (
                        <a
                          href={branch.directionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#FAF9F4] hover:underline transition-colors leading-relaxed"
                          aria-label={`Get directions to ${branch.name} on Google Maps (opens in new tab)`}
                        >
                          {branch.address}
                        </a>
                      ) : (
                        <span className="leading-relaxed">{branch.address}</span>
                      )}
                    </div>

                    {/* Phone Number with functional tel: link */}
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-3.5 h-3.5 text-[#A8C99C] shrink-0" aria-hidden="true" />
                      <a
                        href={`tel:${branch.phone}`}
                        className="hover:text-[#FAF9F4] font-medium transition-colors"
                        aria-label={`Call ${branch.name} at ${branch.displayPhone || branch.phone}`}
                      >
                        {branch.displayPhone || branch.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </address>
            )}
          </div>
        </div>


        {/* =========================================================
            PART D: BOTTOM LEGAL BAR (Dynamic Year, Links & Credits)
           ========================================================= */}
        <div className="pt-4 sm:pt-5 border-t border-[#FAF9F4]/10 flex flex-col md:flex-row items-center justify-between gap-3.5 sm:gap-4 text-xs text-[#FAF9F4]/60">
          {/* Left: Copyright */}
          <p className="text-center md:text-left order-1">
            &copy; {CURRENT_YEAR} Aura De-Addiction Centre. All rights reserved.
          </p>

          {/* Center: Legal Modals */}
          <div className="flex items-center gap-5 sm:gap-6 order-2">
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="hover:text-[#FAF9F4] transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
            >
              Privacy Policy
            </button>
            <span className="text-[#FAF9F4]/20" aria-hidden="true">
              &bull;
            </span>
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="hover:text-[#FAF9F4] transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
            >
              Terms and Conditions
            </button>
          </div>

          {/* Right End: Agency Credit */}
          <div className="text-center md:text-right order-3">
            <a
              href="https://www.zerolimits.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#FAF9F4]/70 hover:text-[#A8C99C] transition-colors duration-200 group focus-visible:outline-none focus-visible:underline"
              aria-label="Design and Developed by Zero Limits (opens in new tab)"
            >
              <span>Design and Developed by</span>
              <span className="text-[#FAF9F4] group-hover:text-[#A8C99C] font-semibold underline underline-offset-2 decoration-[#FAF9F4]/30 group-hover:decoration-[#A8C99C] transition-colors">
                Zero Limits
              </span>
              <ArrowUpRight
                className="w-3.5 h-3.5 text-[#FAF9F4]/50 group-hover:text-[#A8C99C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================
          ACCESSIBLE LEGAL MODAL DIALOG
         ========================================================= */}
      {legalModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="relative w-full max-w-lg bg-[#203D2E] text-[#FAF9F4] border border-[#FAF9F4]/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#FAF9F4]/10 pb-4">
              <h3
                id="legal-modal-title"
                className="font-serif text-xl sm:text-2xl text-[#FAF9F4]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {legalModal === 'privacy'
                  ? 'Privacy Policy & Confidentiality'
                  : 'Terms & Conditions of Care'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="p-1.5 rounded-full text-[#FAF9F4]/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C99C]"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="font-sans text-xs sm:text-sm text-[#FAF9F4]/80 leading-relaxed space-y-3">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    At Aura De-Addiction Centre, patient privacy and clinical confidentiality are absolute priorities. All medical assessments, admissions records, counseling dialogues, and therapeutic data remain 100% confidential.
                  </p>
                  <p>
                    We strictly uphold healthcare ethical standards. Personal details and treatment histories are never disclosed to third parties or unauthorized personnel without explicit written consent from the patient or legal guardian.
                  </p>
                  <p>
                    For privacy inquiries or direct records verification, please reach out to our administration at{' '}
                    <a href="tel:7418661994" className="text-[#A8C99C] underline">
                      +91 74186 61994
                    </a>.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Rehabilitation and medical detoxification programs at Aura De-Addiction Centre follow individualized clinical protocols guided by psychiatric and medical practitioners.
                  </p>
                  <p>
                    Admission requires compassionate agreement from the individual and family care partners. Respect for centre guidelines, mutual dignity, and therapeutic cooperation are essential foundations for sustainable recovery.
                  </p>
                  <p>
                    All clinical therapies and aftercare support are designed to foster long-term independence, personal well-being, and renewed purpose.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 rounded-full bg-[#FAF9F4] text-[#203D2E] text-xs font-semibold hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C99C]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
