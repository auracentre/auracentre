import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Heart, Sparkles, Sprout, Compass } from 'lucide-react';
import { useMotionPreference } from '../../hooks/useMotionPreference';
import sanctuaryGardenImg from '../../assets/images/aura-sanctuary-gardens.jpg';
import mindfulnessAtriumImg from '../../assets/images/aura-mindfulness-conservatory.png';
import facilityBuildingImg from '../../assets/images/aura-facility-enhanced.jpg';

/**
 * Five Recovery Journey Milestones
 * Strictly matching the requested copy, order, and numbered markers 01-05.
 */
const TIMELINE_STEPS = [
  {
    step: '01',
    title: 'A Safe Space',
    description: 'Confidential and respectful care in a supportive environment.',
    icon: ShieldCheck,
  },
  {
    step: '02',
    title: 'Personalised Treatment',
    description: "Individualised care based on each person's needs and circumstances.",
    icon: Compass,
  },
  {
    step: '03',
    title: 'Healing Together',
    description: 'Appropriate family involvement and supportive guidance.',
    icon: Heart,
  },
  {
    step: '04',
    title: 'Building New Habits',
    description: 'A structured environment that supports healthier routines and positive progress.',
    icon: Sparkles,
  },
  {
    step: '05',
    title: 'Support Beyond Treatment',
    description: 'Continued guidance and support after discharge, where available.',
    icon: Sprout,
  },
];

/**
 * WhyChooseUsSection Component — Aura De-Addiction Center
 * "The Aura Difference — A Path to Recovery"
 *
 * Architecture:
 * - Positioned directly after Our Services on the homepage (#why-choose-us).
 * - Warm ivory background (#FAF9F4) with Forest Green (#43583C) and Botanical Green (#91B978).
 * - Part A: Two-column editorial introduction with headline, empathetic narrative, primary CTA, and authentic garden photography.
 * - Part B: Vertical recovery journey timeline (01 to 05) with connecting lines and refined typography.
 * - Part C: Closing wide photographic strip showcasing the serene conservatory atrium.
 * - Accessible, responsive, and honors prefers-reduced-motion.
 */
export default function WhyChooseUsSection() {
  const prefersReducedMotion = useMotionPreference();

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

  const timelineItemVariant = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.5,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      id="why-choose-us"
      aria-label="Why Choose Us — The Aura Difference and Path to Recovery"
      className="w-full bg-[#FAF9F4] text-[#26382B] py-16 sm:py-20 md:py-24 lg:py-28 select-none border-b border-[#E8ECE4] scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* =========================================================
            PART A: EDITORIAL INTRODUCTORY AREA (Two-Column Desktop)
           ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center mb-16 sm:mb-20 lg:mb-24">
          {/* Left Column: Eyebrow, Main Headline, Narrative & Primary CTA */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
            {/* 1. Eyebrow Tag */}
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
                THE AURA DIFFERENCE
              </span>
            </motion.div>

            {/* 2. Main Headline */}
            <motion.h2
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={0.15}
              className="font-serif text-[36px] sm:text-[44px] md:text-[50px] lg:text-[56px] leading-[1.12] text-[#26382B] font-normal tracking-[-0.015em] mb-5 sm:mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', 'DM Serif Display', Georgia, serif",
                fontWeight: 400,
              }}
            >
              A New Beginning Starts Here.
            </motion.h2>

            {/* 3. Empathetic Narrative */}
            <motion.p
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={0.25}
              className="font-sans text-[15px] sm:text-[16px] text-[#6D746C] leading-[1.78] font-normal mb-8 max-w-xl"
            >
              At Aura, recovery is rooted in empathy, clinical excellence, and genuine human connection. We offer a safe, respectful sanctuary where individuals and families receive confidential, personalised guidance to heal, rediscover purpose, and build lasting resilience.
            </motion.p>

            {/* 4. Primary CTA: Get Help */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={0.35}
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
                className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm font-semibold tracking-wide text-white bg-[#43583C] hover:bg-[#34462E] active:scale-[0.98] transition-all duration-200 shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#43583C] focus-visible:ring-offset-[#FAF9F4]"
              >
                <span>Get Help</span>
                <ArrowRight className="w-4 h-4 text-white/80 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Authentic Sanctuary Photograph */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            custom={0.25}
            className="lg:col-span-6 xl:col-span-6 w-full"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-[20px] sm:rounded-[24px] border border-[#E8ECE4] shadow-[0_8px_30px_-6px_rgba(38,56,43,0.08)] group bg-white">
              <img
                src={sanctuaryGardenImg}
                alt="Aura healing gardens and peaceful recovery courtyard in soft natural morning sunlight"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
                width={900}
                height={675}
              />
              {/* Subtle architectural badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-auto bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#E8ECE4]/80 shadow-sm flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#81916F]" aria-hidden="true" />
                <span className="font-sans text-xs sm:text-[13px] font-medium text-[#26382B]">
                  Healing Sanctuary Grounds &amp; Courtyard
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =========================================================
            PART B: VERTICAL RECOVERY JOURNEY TIMELINE & RECOVERY ENVIRONMENT
           ========================================================= */}
        <div className="w-full pt-6 sm:pt-8 mb-16 sm:mb-20 lg:mb-24">
          {/* Timeline Section Header */}
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <motion.span
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={0.05}
              className="font-sans text-xs sm:text-[13px] font-medium tracking-[0.22em] text-[#81916F] uppercase block mb-3"
            >
              A PATH TO RECOVERY
            </motion.span>
            <motion.h3
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={0.15}
              className="font-serif text-[28px] sm:text-[34px] md:text-[38px] text-[#26382B] font-normal leading-[1.2]"
              style={{
                fontFamily: "'Cormorant Garamond', 'DM Serif Display', Georgia, serif",
                fontWeight: 400,
              }}
            >
              Guided With Care at Every Step
            </motion.h3>
          </div>

          {/* Two-Column Layout: Left Timeline (01 to 05), Right Recovery Environment Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
            {/* Left Column: Vertical Recovery Journey Timeline (01 to 05) */}
            <div className="lg:col-span-7 xl:col-span-7 relative">
              {/* Continuous Vertical Connector Line */}
              <div
                className="absolute left-[21px] sm:left-[27px] top-6 bottom-6 w-[1.5px] bg-[#E8ECE4]"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-8 sm:gap-10">
                {TIMELINE_STEPS.map((item, index) => {
                  const IconComponent = item.icon;

                  return (
                    <motion.div
                      key={item.step}
                      variants={timelineItemVariant}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-30px' }}
                      custom={0.1 + index * 0.08}
                      className="group relative flex items-start gap-5 sm:gap-7"
                    >
                      {/* Numbered Marker Badge (01 to 05) */}
                      <div className="shrink-0 relative z-10 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white border border-[#81916F]/40 shadow-[0_2px_10px_-2px_rgba(38,56,43,0.06)] flex items-center justify-center transition-all duration-300 group-hover:border-[#43583C] group-hover:scale-105">
                        <span
                          className="font-serif text-[15px] sm:text-[17px] font-semibold text-[#43583C] tracking-wider"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                          {item.step}
                        </span>
                      </div>

                      {/* Step Card Content */}
                      <div className="flex-1 pt-1.5 sm:pt-2 pb-1">
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <IconComponent
                            className="w-4 h-4 text-[#81916F] shrink-0"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                          <h4
                            className="font-serif text-[20px] sm:text-[23px] font-medium text-[#26382B] leading-snug group-hover:text-[#43583C] transition-colors duration-250 tracking-[-0.01em]"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                          >
                            {item.title}
                          </h4>
                        </div>
                        <p className="font-sans text-[14px] sm:text-[15px] text-[#6D746C] leading-[1.68] font-normal max-w-2xl">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Recovery Environment Photo & Supporting Text */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={0.25}
              className="lg:col-span-5 xl:col-span-5 w-full flex flex-col items-start"
            >
              {/* Premium Recovery Environment Photograph */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden rounded-[20px] sm:rounded-[24px] border border-[#E8ECE4] shadow-[0_8px_30px_-6px_rgba(38,56,43,0.08)] group bg-white">
                <img
                  src={facilityBuildingImg}
                  alt="Aura De-Addiction & Psychiatric Treatment Centre campus facility and peaceful recovery environment"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={600}
                />
              </div>

              {/* Supporting Text directly beneath the image */}
              <div className="mt-5 sm:mt-6 text-left w-full">
                <h4
                  className="font-serif text-[22px] sm:text-[24px] md:text-[26px] font-normal text-[#26382B] leading-tight mb-2 tracking-[-0.01em]"
                  style={{
                    fontFamily: "'Cormorant Garamond', 'DM Serif Display', Georgia, serif",
                    fontWeight: 400,
                  }}
                >
                  A Place to Begin Again
                </h4>
                <p className="font-sans text-[14px] sm:text-[15px] text-[#6D746C] leading-[1.65] font-normal italic">
                  &ldquo;A calm, supportive environment where every step forward matters.&rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* =========================================================
            PART C: CLOSING PHOTOGRAPHIC STRIP (Mindfulness Conservatory)
           ========================================================= */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          custom={0.2}
          className="w-full max-w-6xl mx-auto"
        >
          <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9] w-full overflow-hidden rounded-[20px] sm:rounded-[24px] border border-[#E8ECE4] shadow-[0_8px_30px_-6px_rgba(38,56,43,0.08)] group bg-white">
            <img
              src={mindfulnessAtriumImg}
              alt="Aura recovery sanctuary campus grounds"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              loading="lazy"
              decoding="async"
              width={1200}
              height={500}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
