import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  HeartPulse,
  UsersRound,
  Sprout,
  ShieldCheck,
  Flower2,
  Brain,
  Phone,
} from 'lucide-react';
import { useMotionPreference } from '../../hooks/useMotionPreference';

/**
 * Curated Recovery & Hope Quotes
 */
const RECOVERY_QUOTES = [
  {
    id: 'quote-1',
    quote: 'Recovery is not a race; it is a gentle rediscovery of who you were always meant to be.',
    author: 'Aura Care Philosophy',
    role: 'Guiding Principles of Healing',
  },
  {
    id: 'quote-2',
    quote: 'Healing does not mean the damage never existed. It means the damage no longer controls your life.',
    author: 'Dr. R. Arvind',
    role: 'Chief Medical Director & Psychiatrist',
  },
  {
    id: 'quote-3',
    quote: 'The secret of change is to focus all of your energy not on fighting the old, but on building the new.',
    author: 'Words of Wisdom',
    role: 'Mindful Daily Practice',
  },
  {
    id: 'quote-4',
    quote: 'Every path to freedom begins with the courage to speak your truth in a place of safety and unconditional dignity.',
    author: 'Abishek A',
    role: 'Director of Rehabilitation',
  },
];

/**
 * Seven Clinical & Holistic Support Services
 * Strictly matching the proposed copy, order, and appropriate line icons.
 */
const SERVICES_DATA = [
  {
    id: 'inpatient-treatment',
    title: 'Inpatient Treatment Programs',
    description: 'Structured residential care in a supportive environment.',
    icon: Building2,
  },
  {
    id: 'detoxification-supervision',
    title: 'Detoxification & Medical Supervision',
    description: 'Medical supervision and support during detoxification, when provided by the centre.',
    icon: HeartPulse,
  },
  {
    id: 'counselling-therapy',
    title: 'Individual, Group & Family Counselling',
    description: 'Personal and family-focused guidance to support the recovery journey.',
    icon: UsersRound,
  },
  {
    id: 'rehabilitation-aftercare',
    title: 'Rehabilitation & Aftercare',
    description: 'Ongoing support to help individuals navigate life beyond treatment.',
    icon: Sprout,
  },
  {
    id: 'relapse-prevention',
    title: 'Relapse Prevention Programs',
    description: 'Strategies and continuing support to help manage recovery challenges.',
    icon: ShieldCheck,
  },
  {
    id: 'holistic-therapies',
    title: 'Holistic Therapies',
    description: 'Yoga, meditation and art therapy, where these services are available.',
    icon: Flower2,
  },
  {
    id: 'medical-psychological-support',
    title: 'Medical & Psychological Support',
    description: "Professional medical and psychological support according to the centre's available services.",
    icon: Brain,
  },
];

/**
 * OurServicesSection Component — Aura De-Addiction Center
 *
 * Editorial Layout Architecture:
 * - Positioned directly after What We Treat on the homepage (#our-services).
 * - Pure white background (#FFFFFF) with high-contrast editorial typography.
 * - Two-column responsive desktop layout:
 *   - Left column: Editorial introduction with "HOW WE SUPPORT YOU" label, serif title, and inspirational recovery quotes.
 *   - Right column: Clean, uncluttered list of 7 services separated by subtle dividers (#E8EAE5).
 * - Minimal icon container (42-48px) with forest green line icons (#43583C).
 * - Subtle hover highlight (#F7F8F4) and botanical green title transition.
 * - Hardware-accelerated entrance reveals honoring prefers-reduced-motion.
 */
export default function OurServicesSection() {
  const prefersReducedMotion = useMotionPreference();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Auto-advance quotes every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % RECOVERY_QUOTES.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const currentQuote = RECOVERY_QUOTES[currentQuoteIndex];

  const fadeUpVariant = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.55,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const rowVariant = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.45,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      id="our-services"
      aria-label="Our Services — Compassionate Treatment and Care Programs"
      className="w-full bg-[#FFFFFF] text-[#26382B] py-16 sm:py-20 md:py-24 lg:py-28 select-none border-b border-[#E8EAE5] scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start">
          {/* =========================================================
              LEFT COLUMN: Editorial Heading & Quotes (Sticky on Desktop)
             ========================================================= */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 lg:self-start z-10">
            {/* 1. Small Uppercase Section Label */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={0.05}
              className="flex items-center gap-3 mb-4 sm:mb-5"
            >
              <div className="w-8 sm:w-10 h-[1.5px] bg-[#81916F]/70 rounded-full" aria-hidden="true" />
              <span className="font-sans text-xs sm:text-[13px] font-medium tracking-[0.24em] text-[#81916F] uppercase">
                HOW WE SUPPORT YOU
              </span>
            </motion.div>

            {/* 2. Main Editorial Serif Heading */}
            <motion.h2
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={0.15}
              className="font-serif text-[36px] sm:text-[44px] md:text-[50px] lg:text-[54px] leading-[1.12] text-[#26382B] font-normal tracking-[-0.015em] mb-4 sm:mb-5"
              style={{
                fontFamily: "'Cormorant Garamond', 'DM Serif Display', Georgia, serif",
                fontWeight: 400,
              }}
            >
              Our Services
            </motion.h2>

            {/* 3. Supporting Description */}
            <motion.p
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={0.25}
              className="font-sans text-[15px] sm:text-[16px] text-[#6D746C] leading-[1.7] font-normal max-w-md"
            >
              Thoughtful care. Professional guidance. Support at every stage of the recovery journey.
            </motion.p>

            {/* 4. Inspirational Recovery Quote (Pure Quote Only) */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={0.35}
              className="mt-8 pt-6 border-t border-[#E8EAE5]"
            >
              <div className="relative min-h-[80px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuote.id}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -6 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <blockquote
                      className="font-serif italic text-[18px] sm:text-[20px] lg:text-[22px] text-[#26382B] leading-[1.65] font-normal"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                      }}
                    >
                      “{currentQuote.quote}”
                    </blockquote>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 5. Circular Rotating Text: 24/7 Support for Our Customers */}
              <div className="mt-8 pt-6 border-t border-[#E8EAE5]/60 flex items-center">
                <a
                  href="tel:7418661994"
                  title="24/7 Support for Our Customers — Click to call"
                  className="group relative inline-flex items-center justify-center cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#91B978] rounded-full p-1"
                  aria-label="24/7 Support for Our Customers - Click to Call 7418661994"
                >
                  {/* Rotating Circular Text SVG */}
                  <motion.div
                    animate={prefersReducedMotion ? {} : { rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 22,
                      ease: 'linear',
                    }}
                    className="w-28 h-28 sm:w-32 sm:h-32 text-[#43583C] group-hover:text-[#2F5C40] transition-colors"
                  >
                    <svg
                      viewBox="0 0 140 140"
                      className="w-full h-full"
                      style={{ overflow: 'visible' }}
                    >
                      <defs>
                        <path
                          id="circleSupportPath"
                          d="M 70, 70 m -48, 0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0"
                        />
                      </defs>
                      <text
                        className="text-[7.2px] uppercase font-semibold fill-current"
                        style={{ fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}
                      >
                        <textPath
                          href="#circleSupportPath"
                          startOffset="0%"
                          textLength="296"
                          lengthAdjust="spacing"
                        >
                          ✦ 24/7 SUPPORT FOR OUR CUSTOMERS ✦ 24/7 SUPPORT FOR OUR CUSTOMERS&nbsp;
                        </textPath>
                      </text>
                    </svg>
                  </motion.div>

                  {/* Center Floating Icon with 24/7 Emblem */}
                  <div className="absolute inset-0 m-auto w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#FAF9F4] group-hover:bg-[#E2F0E7] text-[#2F5C40] border border-[#C3E0CE] flex flex-col items-center justify-center transition-all duration-300 shadow-2xs group-hover:scale-105">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4A8F64]" />
                    <span className="text-[10px] sm:text-[10.5px] font-bold tracking-tight text-[#2F5C40] mt-0.5">
                      24/7
                    </span>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: Seven Service Rows with Clean Dividers
             ========================================================= */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="divide-y divide-[#E8EAE5] border-y border-[#E8EAE5]">
              {SERVICES_DATA.map((service, index) => {
                const IconComponent = service.icon;

                return (
                  <motion.div
                    key={service.id}
                    variants={rowVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-30px' }}
                    custom={0.1 + index * 0.06}
                    className="group relative flex items-start gap-4 sm:gap-6 py-6 sm:py-7 px-3.5 sm:px-6 rounded-2xl transition-all duration-250 ease-out hover:bg-[#F7F8F4]"
                  >
                    {/* Minimal Icon Container (42-48px) */}
                    <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F7F8F4] group-hover:bg-white border border-[#E8EAE5]/80 flex items-center justify-center transition-colors duration-250 shadow-[0_2px_8px_-2px_rgba(38,56,43,0.04)]">
                      <IconComponent
                        className="w-5 h-5 text-[#43583C] group-hover:text-[#81916F] transition-colors duration-250"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Central Content Area: Title & Description */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <h3
                        className="font-serif text-[20px] sm:text-[22px] lg:text-[23px] leading-[1.25] text-[#26382B] group-hover:text-[#43583C] transition-colors duration-250 mb-1.5 font-medium tracking-[-0.01em]"
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                        }}
                      >
                        {service.title}
                      </h3>
                      <p className="font-sans text-[14px] sm:text-[15px] text-[#6D746C] leading-[1.65] font-normal">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
