import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMotionPreference } from '../../hooks/useMotionPreference';

/**
 * Hero Component — AURA DE-ADDICTION CENTER
 *
 * Full-bleed contemporary luxury wellness aesthetic inspired by EastGold reference design.
 *
 * Composition:
 * - Left Side (~46%): Refined typography, brand label, headline, supporting text, and primary CTA.
 * - Right Side (~54%): Full-bleed architectural photograph extending to the right edge with a soft
 *   gradient blend into the pure white background on the left.
 * - Bottom Bar: Continuous, infinite looping service and trust ticker separated by champagne stars (✦).
 */
export default function Hero() {
  const prefersReducedMotion = useMotionPreference();

  // Dynamically calibrate to exact un-scrolled header height to eliminate any bottom gap
  React.useEffect(() => {
    const updateHeaderHeight = () => {
      // Calibrate when near top of viewport so scroll-compression doesn't cause hero layout shift
      if (window.scrollY < 20) {
        const header = document.querySelector('header');
        if (header) {
          const rect = header.getBoundingClientRect();
          if (rect.height > 0) {
            document.documentElement.style.setProperty('--aura-header-height', `${rect.height}px`);
          }
        }
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    const handleScroll = () => {
      if (window.scrollY < 20) {
        updateHeaderHeight();
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let observer;
    const header = document.querySelector('header');
    if (header && window.ResizeObserver) {
      observer = new ResizeObserver(updateHeaderHeight);
      observer.observe(header);
    }

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      window.removeEventListener('scroll', handleScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  // Entrance animation variants
  const leftContentVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: (customDelay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.55,
        delay: prefersReducedMotion ? 0 : customDelay,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };


  const tickerItems = [
    'Confidential Rehabilitation',
    'Medical Detoxification',
    '24/7 Professional Medical Intake',
    'Evidence-Based Recovery',
    'Substance & Alcohol Treatment',
    'Dual-Diagnosis Psychiatric Care',
    'Compassionate Family Support',
    'Holistic Wellness Sanctuary',
    'Tailored Relapse Prevention',
    'Dignity, Hope & Renewal',
  ];

  return (
    <div className="flex-1 w-full bg-[#FFFFFF] text-[#29392E] flex flex-col justify-between overflow-hidden">
      {/* =========================================================
          HERO MAIN BODY: Inspired by Reference Design (Editorial Serif + Eyebrow Bar + Pill CTA)
         ========================================================= */}
      <div className="flex-1 w-full flex flex-col items-center justify-center min-h-0 relative px-4 sm:px-12 lg:px-16 py-4 sm:py-6 md:py-8 lg:py-10">
        <div className="w-full max-w-7xl flex flex-col items-center text-center z-10">
          {/* 1. Eyebrow Tag with Center Accent Bar (Reference Style) */}
          <motion.div
            variants={leftContentVariants}
            initial="hidden"
            animate="visible"
            custom={0.05}
            className="flex flex-col items-center mb-4 sm:mb-5 max-w-full px-2"
          >
            <span className="font-sans text-[11px] sm:text-[12.5px] font-semibold tracking-[0.14em] sm:tracking-[0.2em] text-[#3A7450] uppercase text-center leading-snug">
              AURA · DE-ADDICTION &amp; RECOVERY SANCTUARY
            </span>
            <div className="w-10 sm:w-12 h-[2.5px] bg-[#4A8F64] rounded-full mt-1.5 sm:mt-2" aria-hidden="true" />
          </motion.div>

          {/* 2. Editorial Slender Serif Headline (Single Line on Desktop, Graceful Wrap on Mobile) */}
          <motion.h1
            variants={leftContentVariants}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="hero-editorial-headline text-[34px] min-[380px]:text-[38px] leading-[1.14] sm:text-[44px] sm:leading-[1.12] md:text-[50px] lg:text-[58px] text-[#222923] sm:whitespace-nowrap max-w-none text-center px-2 sm:px-0"
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontWeight: 400,
            }}
          >
            Every recovery. Completely guided with care.
          </motion.h1>

          {/* 3. Comprehensive Clinical Supporting Description (Two Balanced Lines) */}
          <motion.p
            variants={leftContentVariants}
            initial="hidden"
            animate="visible"
            custom={0.25}
            className="font-sans text-[13.5px] sm:text-[15px] lg:text-[16px] text-[#566359] leading-[1.65] sm:leading-[1.75] max-w-xl sm:max-w-4xl font-normal mt-4 sm:mt-5 md:mt-6 mb-6 sm:mb-7 md:mb-8 text-center px-2 sm:px-0"
          >
            <span className="block sm:whitespace-nowrap">
              Aura integrates medical detoxification, psychiatric therapy, residential wellness,
            </span>
            <span className="block sm:whitespace-nowrap mt-1 sm:mt-1.5">
              compassionate family counseling, and continuous relapse prevention into one connected recovery pathway.
            </span>
          </motion.p>

          {/* 4. Primary Pill CTA Button with Arrow */}
          <motion.div
            variants={leftContentVariants}
            initial="hidden"
            animate="visible"
            custom={0.35}
            className="flex flex-col items-center"
          >
            <Link
              to="/#contact"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  const el = document.getElementById('contact');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', '/#contact');
                  }
                }
              }}
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-[#2F5C40] hover:bg-[#244732] text-white font-sans text-sm sm:text-[14.5px] font-semibold tracking-wide transition-all duration-200 shadow-[0_6px_20px_rgba(47,92,64,0.25)] hover:shadow-[0_8px_26px_rgba(47,92,64,0.35)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5C40] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <span>Begin Your Recovery</span>
              <span
                className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1 text-base leading-none"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM TICKER: Continuous Looping Trust & Service Bar
         ========================================================= */}
      <div className="w-full shrink-0 border-y border-[#E8ECE4] bg-white py-2.5 sm:py-3 md:py-3.5 overflow-hidden select-none">
        <div className="animate-marquee-scroll flex items-center">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div key={index} className="flex items-center shrink-0">
              <span className="font-sans text-[14px] sm:text-[16px] lg:text-[17.5px] font-medium tracking-[0.02em] text-[#29392E] whitespace-nowrap">
                {item}
              </span>
              <span
                className="text-[#C5A572] text-xs sm:text-sm select-none mx-4 sm:mx-6 md:mx-8 opacity-90"
                aria-hidden="true"
              >
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
