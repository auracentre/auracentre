import React from 'react';
import { motion } from 'framer-motion';
import { useMotionPreference } from '../../hooks/useMotionPreference';
import alcoholImg from '../../assets/images/alcohol-addiction.jpg';
import drugImg from '../../assets/images/drug-dependency.jpg';
import smokingImg from '../../assets/images/smoking-nicotine.jpg';

/**
 * Treatment Categories Data
 * Strictly adhering to exact titles, clinical descriptions, and high-resolution realistic photography.
 */
const TREATMENT_CATEGORIES = [
  {
    id: 'alcohol-addiction',
    title: 'Alcohol Addiction',
    description: 'Compassionate support for people experiencing difficulties related to alcohol use.',
    image: alcoholImg,
    alt: 'Realistic photographic still-life of a glass bottle and drinking glass on a rustic wooden table with natural light',
  },
  {
    id: 'drug-dependency',
    title: 'Drug Dependency',
    description: 'Understanding substance use with dignity, care and appropriate support.',
    image: drugImg,
    alt: 'Clean clinical still-life photography of authentic pharmaceutical capsules and tablets on a ceramic surface',
  },
  {
    id: 'smoking-nicotine',
    title: 'Smoking & Nicotine',
    description: 'Support for people seeking to address smoking and nicotine dependence.',
    image: smokingImg,
    alt: 'Realistic editorial photograph of an unlit cigarette resting beside a handcrafted ceramic ashtray',
  },
];

/**
 * WhatWeTreatSection Component — Aura De-Addiction Center
 *
 * Design Architecture:
 * - Positioned directly after About Us on the homepage (#what-we-treat).
 * - Pure white background (#FFFFFF) with high-contrast editorial typography.
 * - Three image-led treatment cards with 4:5 portrait aspect ratio.
 * - Photorealistic editorial photography with consistent natural lighting and earthy tones.
 * - Restrained typography: Cormorant Garamond heading, Manrope/DM Sans card titles and body.
 * - Zero artificial CGI, 3D renders, numbering, or heavy shadows.
 * - Hardware-accelerated hover effects and scroll reveals with prefers-reduced-motion support.
 */
export default function WhatWeTreatSection() {
  const prefersReducedMotion = useMotionPreference();

  // Subtle scroll-in animations
  const fadeUpVariant = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const cardVariant = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.65,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      id="what-we-treat"
      aria-label="What We Treat — Specialized Addiction and Dependency Care"
      className="w-full bg-[#FFFFFF] text-[#26382B] py-16 sm:py-20 md:py-24 lg:py-28 select-none border-b border-[#E8ECE4] scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* =========================================================
            SECTION HEADER: Centered Label, Editorial Heading, Description
           ========================================================= */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          {/* 1. Small Uppercase Section Label */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0.05}
            className="flex items-center gap-3 mb-4 sm:mb-5"
          >
            <div className="w-8 sm:w-10 h-[1.5px] bg-[#81916F]/70 rounded-full" aria-hidden="true" />
            <span className="font-sans text-xs sm:text-[13px] font-medium tracking-[0.24em] text-[#81916F] uppercase">
              COMPASSIONATE CARE
            </span>
            <div className="w-8 sm:w-10 h-[1.5px] bg-[#81916F]/70 rounded-full" aria-hidden="true" />
          </motion.div>

          {/* 2. Main Editorial Serif Heading */}
          <motion.h2
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0.15}
            className="font-serif text-[36px] sm:text-[46px] md:text-[54px] lg:text-[60px] leading-[1.12] text-[#26382B] font-normal tracking-[-0.015em] mb-4 sm:mb-5"
            style={{
              fontFamily: "'Cormorant Garamond', 'DM Serif Display', Georgia, serif",
              fontWeight: 400,
            }}
          >
            What We Treat
          </motion.h2>

          {/* 3. Supporting Description */}
          <motion.p
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0.25}
            className="font-sans text-[15px] sm:text-[17px] text-[#6D746C] leading-[1.7] font-normal max-w-4xl mx-auto sm:whitespace-nowrap"
          >
            Every journey is different. Every person deserves understanding and support.
          </motion.p>
        </div>

        {/* =========================================================
            TREATMENT CARDS: Three Columns, 4:5 Aspect, Realistic Photos
           ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-8 xl:gap-10">
          {TREATMENT_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={0.15 + index * 0.12}
              className="group flex flex-col bg-white text-left focus-within:ring-2 focus-within:ring-[#81916F] rounded-xl"
            >
              {/* Image Frame with 4:5 Portrait Aspect Ratio */}
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[14px] sm:rounded-[16px] bg-[#FAF9F6] border border-[#E8ECE4]/80 shadow-[0_4px_20px_-4px_rgba(38,56,43,0.05)] transition-shadow duration-300 group-hover:shadow-[0_8px_28px_-6px_rgba(38,56,43,0.12)]">
                <img
                  src={category.image}
                  alt={category.alt}
                  className="w-full h-full object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                  width={900}
                  height={1125}
                />
              </div>

              {/* Card Typography Content */}
              <div className="flex flex-col pt-5 sm:pt-6">
                <h3
                  className="font-serif text-[22px] sm:text-[24px] lg:text-[25px] leading-[1.2] text-[#26382B] group-hover:text-[#43583C] transition-colors duration-300 mb-2 font-medium tracking-[-0.01em]"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  {category.title}
                </h3>
                <p className="font-sans text-[14px] sm:text-[15px] text-[#6D746C] leading-[1.68] font-normal">
                  {category.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
