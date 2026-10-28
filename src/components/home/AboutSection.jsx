import React from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Building2, Users, CheckCircle2 } from 'lucide-react';
import { useMotionPreference } from '../../hooks/useMotionPreference';
import centerArchitectureImg from '../../assets/images/aura-about-center.png';

/**
 * Configurable Statistics Data Structure
 *
 * [DATA INTEGRITY NOTE]:
 * Figures supplied by client specifications:
 * - 3 Branches (Residential & Clinical Sanctuaries)
 * - 1,000+ Customers (Individuals and families assisted on recovery pathways)
 * - 100% Customer Satisfaction (Commitment to compassionate, dignified care)
 *
 * Flagged for periodic administrative confirmation prior to clinical publishing.
 */
const ABOUT_STATISTICS = [
  {
    id: 'branches',
    icon: Building2,
    number: '2',
    targetValue: 2,
    suffix: '',
    label: 'BRANCHES',
    verified: true,
    note: 'Active clinical and residential recovery campuses in Theni and Dindigul',
  },
  {
    id: 'customers',
    icon: Users,
    number: '1,000+',
    targetValue: 1000,
    suffix: '+',
    label: 'CUSTOMERS',
    verified: true,
    note: 'Patients & families supported across healing pathways',
  },
  {
    id: 'satisfaction',
    icon: CheckCircle2,
    number: '100%',
    targetValue: 100,
    suffix: '%',
    label: 'CUSTOMER SATISFACTION',
    verified: true,
    note: 'Measured across post-treatment family & patient surveys',
  },
];

/**
 * AnimatedStatNumber Component
 * Smooth count-up animation triggered when scrolling into viewport.
 */
function AnimatedStatNumber({ targetValue, suffix = '', fallback, prefersReducedMotion }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [currentValue, setCurrentValue] = React.useState(prefersReducedMotion ? targetValue : 0);

  React.useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      return;
    }

    const controls = animate(0, targetValue, {
      duration: targetValue > 100 ? 1.6 : 1.1,
      ease: [0.16, 1, 0.3, 1], // natural decelerating ease
      onUpdate: (latest) => {
        setCurrentValue(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, targetValue, prefersReducedMotion]);

  const formattedNumber = currentValue.toLocaleString('en-US') + suffix;

  return (
    <span ref={ref} className="inline-block tabular-nums">
      {isInView ? formattedNumber : (fallback || `0${suffix}`)}
    </span>
  );
}

/**
 * AboutSection Component — Aura De-Addiction Center
 *
 * Design Architecture:
 * - Clean Luxury & Restraint: Pure white background (#FFFFFF) with high-contrast editorial typography.
 * - Two-Column Main Layout:
 *    - Left: Section label with accent rule, editorial serif headline with "Hope." highlighted in botanical green,
 *      refined champagne diamond divider, and compassionate supporting narrative.
 *    - Right: Authentic, prominent architectural photograph of the centre (16:10 aspect, subtle corner radius).
 * - Full-Width Bottom Statistics: Three equally spaced columns with subtle vertical dividers,
 *    graceful serif numbers, minimal botanical green icons, and tracking-spaced labels.
 * - Subtle Framer Motion animations respecting prefers-reduced-motion.
 */
export default function AboutSection() {
  const prefersReducedMotion = useMotionPreference();

  // Gentle reveal animations
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

  const imageVariant = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.985 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.7,
        delay: prefersReducedMotion ? 0 : 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="about-aura"
      aria-label="About Aura De-Addiction Center"
      className="w-full bg-[#FFFFFF] text-[#20211E] pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 md:pb-10 select-none border-b border-[#E8ECE4] scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* =========================================================
            TWO-COLUMN MAIN BODY: Editorial Left + Architectural Right
           ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-14 xl:gap-20 items-center">
          {/* LEFT SIDE: Brand Label, Headline, Divider, Narrative */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
            {/* 1. Section Label with beside thin line */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={0.05}
              className="flex items-center gap-3.5 mb-5 sm:mb-6"
            >
              <span className="font-sans text-xs sm:text-[13px] font-normal tracking-[0.24em] text-[#81916F] uppercase">
                ABOUT AURA
              </span>
              <div
                className="w-10 sm:w-14 h-[1.5px] bg-[#81916F]/70 rounded-full"
                aria-hidden="true"
              />
            </motion.div>

            {/* 2. Editorial Serif Headline (Clean, un-bold Cormorant Garamond) */}
            <motion.h2
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={0.15}
              className="font-serif text-[38px] leading-[1.14] sm:text-[48px] sm:leading-[1.12] md:text-[56px] lg:text-[60px] xl:text-[66px] text-[#20211E] font-normal tracking-[-0.01em]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 400,
              }}
            >
              <span className="block font-normal">A New Beginning,</span>
              <span className="block mt-1 sm:mt-1.5 font-normal">
                Built on{' '}
                <span className="text-[#81916F] italic font-normal">Hope.</span>
              </span>
            </motion.h2>

            {/* 3. Decorative Divider with subtle botanical/diamond emblem */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={0.25}
              className="flex items-center gap-3 w-full max-w-sm sm:max-w-md my-6 sm:my-8"
              aria-hidden="true"
            >
              {/* Left Thin Divider */}
              <div className="flex-1 h-[1px] bg-[#E8ECE4]" />
              {/* Subtle Botanical-Inspired Diamond Accent */}
              <div className="flex items-center justify-center text-[#D8C99D]">
                <span className="w-1.5 h-1.5 rotate-45 bg-[#D8C99D] rounded-[0.5px]" />
              </div>
              {/* Right Thin Divider */}
              <div className="flex-1 h-[1px] bg-[#E8ECE4]" />
            </motion.div>

            {/* 4. Supporting Narrative Paragraph (Exact Required Copy) */}
            <motion.p
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={0.32}
              className="font-sans text-[15.5px] sm:text-[17px] lg:text-[18px] text-[#656B65] leading-[1.78] sm:leading-[1.82] font-normal max-w-xl"
            >
              At Aura De-Addiction Center, we believe every individual deserves compassion, dignity
              and the opportunity to begin again. Our approach focuses on understanding, support
              and long-term well-being.
            </motion.p>
          </div>

          {/* RIGHT SIDE: Single Prominent Architectural Image */}
          <div className="lg:col-span-6 xl:col-span-6 w-full">
            <motion.div
              variants={imageVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="w-full relative overflow-hidden rounded-[14px] sm:rounded-[18px] bg-[#FAF9F6] shadow-[0_10px_35px_-10px_rgba(32,33,30,0.07)] border border-[#E8ECE4]/80 aspect-[16/10] sm:aspect-[3/2] lg:aspect-[16/10]"
            >
              <img
                src={centerArchitectureImg}
                alt="Aura De-Addiction Center modern architecture, serene reflecting water pool, and therapeutic recovery campus"
                className="w-full h-full object-cover object-center block transition-transform duration-700 ease-out hover:scale-[1.02]"
                loading="lazy"
                decoding="async"
                width={1200}
                height={750}
              />
            </motion.div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM STATISTICS: Three Full-Width Columns with Dividers
           ========================================================= */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          custom={0.4}
          className="mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 border-t border-[#E8ECE4]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E8ECE4]">
            {ABOUT_STATISTICS.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className={`flex flex-col items-center text-center px-4 py-2 sm:py-0 ${
                    index === 0 ? 'sm:pl-0' : ''
                  } ${index === ABOUT_STATISTICS.length - 1 ? 'sm:pr-0' : ''}`}
                >
                  {/* Subtle Botanical/Forest Green Icon */}
                  <div
                    className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#81916F]/10 text-[#43583C] mb-1.5"
                    aria-hidden="true"
                  >
                    <IconComponent className="w-4.5 h-4.5 text-[#43583C] stroke-[1.6]" />
                  </div>

                  {/* Elegant Regular-Weight Serif Number (Prominently Sized with Count-up Animation) */}
                  <div
                    className="font-serif text-[26px] leading-tight sm:text-[30px] lg:text-[34px] text-[#20211E] font-normal tracking-tight mb-1"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 400,
                    }}
                  >
                    <AnimatedStatNumber
                      targetValue={item.targetValue}
                      suffix={item.suffix}
                      fallback={item.number}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </div>

                  {/* Clean Sans-Serif Moderate Letter-Spaced Label */}
                  <div className="font-sans text-[11px] sm:text-[12px] font-medium tracking-[0.2em] text-[#656B65] uppercase">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
