import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  MapPin,
  Navigation,
  AlertCircle,
  RefreshCw,
  ArrowUpRight,
} from 'lucide-react';
import { useMotionPreference } from '../../hooks/useMotionPreference';
import contactService from '../../services/contactService';

/**
 * ContactSection Component — Aura "For Better Life"
 *
 * Integrated into the bottom of the landing page (#contact), immediately before the footer.
 *
 * Architecture:
 * - Part A: Hero (Two-column layout with empathetic heading, narrative & authentic centre photo)
 * - Part B: Our Locations (Theni — Main Centre & Dindigul — Branch cards with Call Now & Get Directions)
 *
 * Data Layer:
 * - Powered by contactService (asynchronous API fetch with loading, error, retry, and empty states).
 * - Adheres strictly to the Aura design system: Warm ivory (#FAF9F4), Forest green (#43583C), Botanical green (#91B978).
 */
export default function ContactSection() {
  const prefersReducedMotion = useMotionPreference();

  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error' | 'empty'
  const [data, setData] = useState({ branches: [], contactPersons: [] });
  const [errorMessage, setErrorMessage] = useState(null);

  // Asynchronous data loader for retry and refresh
  const handleRetry = useCallback(async () => {
    setStatus('loading');
    setErrorMessage(null);

    try {
      const result = await contactService.getContactData({ bypassCache: true });
      if (!result.branches.length && !result.contactPersons.length) {
        setStatus('empty');
      } else {
        setData(result);
        setStatus('success');
      }
    } catch (err) {
      console.error('Error loading contact information:', err);
      setErrorMessage(
        err.message || 'Unable to retrieve contact details at this moment. Please check your connection.'
      );
      setStatus('error');
    }
  }, []);

  // Initial load
  useEffect(() => {
    let ignore = false;

    async function initialFetch() {
      try {
        const result = await contactService.getContactData();
        if (ignore) return;
        if (!result.branches.length && !result.contactPersons.length) {
          setStatus('empty');
        } else {
          setData(result);
          setStatus('success');
        }
      } catch (err) {
        if (ignore) return;
        console.error('Error loading contact information:', err);
        setErrorMessage(
          err.message || 'Unable to retrieve contact details at this moment. Please check your connection.'
        );
        setStatus('error');
      }
    }

    initialFetch();

    return () => {
      ignore = true;
    };
  }, []);

  // Motion variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
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
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full bg-[#FAF9F4] text-[#26382B] selection:bg-[#91B978]/20 select-none py-16 sm:py-20 md:py-24 border-t border-[#E8ECE4] scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">

        {/* =========================================================
            DATA LOADING, ERROR & EMPTY STATES
           ========================================================= */}
        {status === 'loading' && (
          <div className="space-y-12 py-8" aria-live="polite" aria-busy="true">
            {/* Skeleton Header */}
            <div className="text-center max-w-xl mx-auto space-y-3">
              <div className="h-4 w-32 bg-[#E8ECE4] rounded-full mx-auto animate-pulse" />
              <div className="h-9 w-64 bg-[#E8ECE4] rounded-xl mx-auto animate-pulse" />
            </div>

            {/* Skeleton Branch Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="p-8 rounded-[24px] bg-white border border-[#E8ECE4] shadow-sm space-y-5 animate-pulse"
                >
                  <div className="h-5 w-24 bg-[#E8ECE4] rounded-full" />
                  <div className="h-8 w-3/4 bg-[#E8ECE4] rounded-lg" />
                  <div className="h-14 w-full bg-[#E8ECE4]/70 rounded-lg" />
                  <div className="h-6 w-1/2 bg-[#E8ECE4] rounded-lg" />
                  <div className="pt-4 flex gap-4">
                    <div className="h-11 flex-1 bg-[#E8ECE4] rounded-full" />
                    <div className="h-11 flex-1 bg-[#E8ECE4] rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {status === 'error' && (
          <div
            role="alert"
            className="my-12 p-8 rounded-[24px] bg-white border border-[#E8ECE4] shadow-sm text-center max-w-2xl mx-auto"
          >
            <div className="w-12 h-12 rounded-full bg-[#D87F71]/15 text-[#B85C4E] flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3
              className="font-serif text-2xl text-[#26382B] font-normal mb-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Unable to Retrieve Contact Details
            </h3>
            <p className="font-sans text-sm text-[#6D746C] mb-6 leading-relaxed">
              {errorMessage || 'A temporary connection issue occurred while fetching branch information.'}
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#43583C] text-white text-sm font-semibold hover:bg-[#34462E] active:scale-[0.98] transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Loading</span>
            </button>
          </div>
        )}

        {status === 'empty' && (
          <div className="my-12 p-8 rounded-[24px] bg-white border border-[#E8ECE4] text-center max-w-xl mx-auto">
            <h3
              className="font-serif text-2xl text-[#26382B] font-normal mb-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              No Branch Information Available
            </h3>
            <p className="font-sans text-sm text-[#6D746C] leading-relaxed mb-6">
              Please contact our central helpline directly for admissions, treatment queries, and location details.
            </p>
            <a
              href="tel:7418661994"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#43583C] text-white text-sm font-semibold hover:bg-[#34462E]"
            >
              <Phone className="w-4 h-4" />
              <span>Call Helpline: 7418661994</span>
            </a>
          </div>
        )}

        {/* =========================================================
            PART B: OUR LOCATIONS (Theni & Dindigul Branch Cards)
           ========================================================= */}
        {status === 'success' && data.branches.length > 0 && (
          <div id="contact-locations" className="scroll-mt-20">
            {/* Section Header */}
            <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
              <motion.span
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                custom={0.05}
                className="font-sans text-xs sm:text-[13px] font-medium tracking-[0.22em] text-[#81916F] uppercase block mb-3"
              >
                OUR CENTRES
              </motion.span>
              <motion.h2
                id="contact-heading"
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                custom={0.15}
                className="font-serif text-[32px] sm:text-[38px] md:text-[44px] text-[#26382B] font-normal leading-[1.18] tracking-[-0.01em]"
                style={{
                  fontFamily: "'Cormorant Garamond', 'DM Serif Display', Georgia, serif",
                  fontWeight: 400,
                }}
              >
                Our Locations
              </motion.h2>
              <motion.p
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                custom={0.25}
                className="font-sans text-sm sm:text-[15px] text-[#6D746C] leading-relaxed mt-3"
              >
                Visit or connect directly with our dedicated rehabilitation centres in Theni and Dindigul.
              </motion.p>
            </div>

            {/* Branch Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {data.branches.map((branch, index) => (
                <motion.article
                  key={branch.id}
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  custom={0.15 + index * 0.1}
                  className="relative flex flex-col justify-between p-7 sm:p-9 rounded-[24px] bg-white border border-[#E8ECE4] shadow-[0_8px_30px_-6px_rgba(38,56,43,0.06)] hover:shadow-[0_12px_40px_-6px_rgba(38,56,43,0.1)] transition-all duration-300"
                >
                  <div>
                    {/* Branch Category Badge */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-[#FAF9F4] text-[#43583C] border border-[#E8ECE4]">
                        {branch.type || 'Centre'}
                      </span>
                      <span className="font-mono text-xs text-[#81916F] font-medium">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Branch Name */}
                    <h4
                      className="font-serif text-[26px] sm:text-[28px] md:text-[30px] font-normal text-[#26382B] leading-snug mb-5 tracking-[-0.01em]"
                      style={{
                        fontFamily: "'Cormorant Garamond', 'DM Serif Display', Georgia, serif",
                        fontWeight: 400,
                      }}
                    >
                      {branch.name}
                    </h4>

                    {/* Complete Address */}
                    <div className="flex items-start gap-3.5 mb-5 pb-5 border-b border-[#E8ECE4]/80">
                      <div className="w-8 h-8 rounded-full bg-[#FAF9F4] border border-[#E8ECE4] flex items-center justify-center shrink-0 mt-0.5 text-[#43583C]">
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <span className="block font-sans text-xs uppercase tracking-wider text-[#81916F] font-semibold mb-1">
                          Address
                        </span>
                        <address className="not-italic font-sans text-[14.5px] sm:text-[15px] text-[#4D584F] leading-[1.65]">
                          {branch.address}
                        </address>
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="flex items-center gap-3.5 mb-8">
                      <div className="w-8 h-8 rounded-full bg-[#FAF9F4] border border-[#E8ECE4] flex items-center justify-center shrink-0 text-[#43583C]">
                        <Phone className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="block font-sans text-xs uppercase tracking-wider text-[#81916F] font-semibold mb-0.5">
                          Phone Number
                        </span>
                        <a
                          href={`tel:${branch.phone}`}
                          className="font-sans text-[16px] sm:text-[17px] font-semibold text-[#26382B] hover:text-[#43583C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43583C] rounded-sm"
                        >
                          {branch.displayPhone || branch.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Call Now & Get Directions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {/* 1. Call Now Button */}
                    <a
                      href={`tel:${branch.phone}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold tracking-wide text-white bg-[#43583C] hover:bg-[#34462E] active:scale-[0.98] transition-all duration-200 shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#43583C] focus-visible:ring-offset-white"
                      aria-label={`Call ${branch.name} at ${branch.phone}`}
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      <span>Call Now</span>
                    </a>

                    {/* 2. Get Directions Button */}
                    <a
                      href={branch.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold tracking-wide text-[#43583C] bg-white border border-[#43583C] hover:bg-[#FAF9F4] active:scale-[0.98] transition-all duration-200 shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#43583C] focus-visible:ring-offset-white"
                      aria-label={`Get directions to ${branch.name} on Google Maps (opens in new tab)`}
                    >
                      <Navigation className="w-4 h-4" aria-hidden="true" />
                      <span>Get Directions</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#81916F]" aria-hidden="true" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
