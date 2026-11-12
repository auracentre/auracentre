import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  MapPin,
  Navigation,
  AlertCircle,
  RefreshCw,
  ArrowUpRight,
  X,
  Sparkles,
  Eye,
} from 'lucide-react';
import { useMotionPreference } from '../../hooks/useMotionPreference';
import contactService from '../../services/contactService';
import theniFacilityImg from '../../assets/images/aura-theni-facility.png';
import dindigulFacilityImg from '../../assets/images/aura-facility-enhanced.jpg';

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
  const [activeBranchModal, setActiveBranchModal] = useState(null);

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

  // Lock body scroll and close on Escape when modal is open
  useEffect(() => {
    if (!activeBranchModal) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveBranchModal(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeBranchModal]);

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
              {data.branches.map((branch, index) => {
                const isTheni =
                  branch.name?.toLowerCase().includes('theni') || branch.id?.includes('theni');
                const branchImage = isTheni ? theniFacilityImg : dindigulFacilityImg;

                return (
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
                      {/* Branch Category Badge (Interactive & Shining) */}
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveBranchModal({
                              name: branch.name,
                              address: branch.address,
                              phone: branch.phone,
                              displayPhone: branch.displayPhone || branch.phone,
                              directionsUrl: branch.directionsUrl,
                              image: branchImage,
                            })
                          }
                          className="relative group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-[#1F3C2B] bg-gradient-to-r from-[#F2F8F4] via-[#E2F0E7] to-[#F2F8F4] border border-[#6FAF85]/70 animate-branch-glow hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
                          title="Click to view branch facility photo"
                          aria-label={`View facility photo for ${branch.name}`}
                        >
                          {/* Shining animated light sweep */}
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/85 to-transparent -translate-x-full animate-shimmer-sweep pointer-events-none"
                          />
                          <Sparkles className="w-3.5 h-3.5 text-[#2F5C40] animate-pulse" aria-hidden="true" />
                          <span className="relative z-10 font-bold tracking-wider">{branch.type || 'BRANCH'}</span>
                          <Eye className="w-3 h-3 text-[#2F5C40]/80 ml-0.5 group-hover:text-[#1F3C2B] transition-colors" aria-hidden="true" />
                        </button>
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
              );
            })}
          </div>
          </div>
        )}

        {/* =========================================================
            BRANCH FACILITY PHOTO MODAL
           ========================================================= */}
        <AnimatePresence>
          {activeBranchModal && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm"
              onClick={() => setActiveBranchModal(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="branch-modal-title"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh]"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#FAF9F4]">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#2F5C40]">
                      <Sparkles className="w-3.5 h-3.5 text-[#4A8F64]" aria-hidden="true" />
                      Branch Facility
                    </span>
                    <h3 id="branch-modal-title" className="font-serif text-xl sm:text-2xl font-normal text-gray-900 leading-tight mt-0.5">
                      {activeBranchModal.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveBranchModal(null)}
                    className="w-9 h-9 rounded-full bg-gray-200/70 hover:bg-gray-200 flex items-center justify-center text-gray-700 hover:text-black transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>

                {/* Photo Viewport */}
                <div className="relative w-full max-h-[65vh] bg-stone-950 flex items-center justify-center overflow-hidden">
                  <img
                    src={activeBranchModal.image}
                    alt={`${activeBranchModal.name} Facility`}
                    className="w-full max-h-[65vh] object-contain mx-auto"
                  />
                </div>

                {/* Modal Footer info & actions */}
                <div className="p-5 sm:p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 max-w-md">
                    <MapPin className="w-4 h-4 text-[#2F5C40] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{activeBranchModal.address}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={`tel:${activeBranchModal.phone}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#43583C] hover:bg-[#34462E] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Call Now</span>
                    </a>
                    {activeBranchModal.directionsUrl && (
                      <a
                        href={activeBranchModal.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#43583C] bg-white border border-[#43583C] hover:bg-[#FAF9F4] transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Get Directions</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
