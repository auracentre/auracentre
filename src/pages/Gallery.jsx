import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// Verified Authentic User-Provided Assets
import dindigulFacilityImg from '../assets/images/aura-dindigul-facility.png';
import groupTherapyImg from '../assets/images/aura-about-center.png';
import inpatientWardImg from '../assets/images/aura-mindfulness-conservatory.png';
import abishekImg from '../assets/images/abishek-director.png';
import amanullaImg from '../assets/images/amanulla-cofounder.png';
import gowthamanImg from '../assets/images/gowthaman-medical-officer.png';
import kanagaporaniImg from '../assets/images/kanagaporani-psychiatrist.png';
import rajeshKannanImg from '../assets/images/rajesh-kannan-psychiatrist.png';
import InfiniteSpiral from '../components/common/InfiniteSpiral';

/**
 * Authentic Gallery Items Data (Only user-provided images)
 */
const SPIRAL_ITEMS = [
  {
    id: 'aura-facility-dindigul',
    src: dindigulFacilityImg,
    image: dindigulFacilityImg,
    alt: 'Aura De-Addiction & Psychiatric Treatment Centre Dindigul Facility',
    title: 'Aura De-Addiction Centre Facility',
    categoryLabel: 'Centre & Campus',
    location: 'Dindigul — Main Centre',
    description:
      'Official residential de-addiction and psychiatric treatment facility in Dindigul, providing safe, confidential inpatient stabilization and round-the-clock medical care.',
  },
  {
    id: 'group-therapy-session',
    src: groupTherapyImg,
    image: groupTherapyImg,
    alt: 'Patients and counselors participating in interactive group therapy session at Aura',
    title: 'Group Counseling & Recovery Therapy',
    categoryLabel: 'Therapy & Rehabilitation',
    location: 'Counseling Hall',
    description:
      'Structured group therapy and peer reflection sessions where residents share experiences, develop emotional resilience, and support each other through guided recovery modules.',
  },
  {
    id: 'inpatient-recovery-ward',
    src: inpatientWardImg,
    image: inpatientWardImg,
    alt: 'Patient inpatient recovery beds and peaceful themed dormitory ward at Aura',
    title: 'Inpatient Residential Ward',
    categoryLabel: 'Living Quarters',
    location: 'Residential Wing',
    description:
      'Clean, comfortable residential accommodations with dedicated care beds, vibrant uplifting wall murals, and constant monitoring for patient safety and dignity.',
  },
  {
    id: 'founder-abishek',
    src: abishekImg,
    image: abishekImg,
    alt: 'Founder Abishek A at Aura De-Addiction Center',
    title: 'Founder — Abishek A',
    categoryLabel: 'Leadership',
    location: 'Executive Office',
    description:
      'Founder and Director of Rehabilitation, providing visionary leadership, family counseling, and long-term aftercare support.',
  },
  {
    id: 'cofounder-amanulla',
    src: amanullaImg,
    image: amanullaImg,
    alt: 'Co-Founder Amanulla N at Aura De-Addiction Center',
    title: 'Co-Founder — Amanulla N',
    categoryLabel: 'Leadership',
    location: 'Admissions Office',
    description:
      'Co-Founder and Head of Admissions, coordinating 24/7 crisis response, confidential patient assessments, and family guidance.',
  },
  {
    id: 'medical-officer-gowthaman',
    src: gowthamanImg,
    image: gowthamanImg,
    alt: 'Medical Officer Dr. T. Gowthaman at Aura De-Addiction Center',
    title: 'Medical Officer — Dr. T. Gowthaman',
    categoryLabel: 'Medical Leadership',
    location: 'Clinical Ward',
    description:
      'Medical Officer overseeing inpatient detoxification, medical stabilization, and daily clinical wellness monitoring.',
  },
  {
    id: 'psychiatrist-kanagaporani',
    src: kanagaporaniImg,
    image: kanagaporaniImg,
    alt: 'Psychiatrist Dr. M. Kanagaporani at Aura De-Addiction Center',
    title: 'Psychiatrist — Dr. M. Kanagaporani',
    categoryLabel: 'Psychiatric Care',
    location: 'Consultation Suite',
    description:
      'Consultant Psychiatrist specializing in addiction psychiatry, dual-diagnosis management, cognitive therapies, and comprehensive mental health restoration.',
  },
  {
    id: 'psychiatrist-rajesh-kannan',
    src: rajeshKannanImg,
    image: rajeshKannanImg,
    alt: 'Psychiatrist Dr. Rajesh Kannan at Aura De-Addiction Center',
    title: 'Psychiatrist — Dr. Rajesh Kannan',
    categoryLabel: 'Psychiatric Care',
    location: 'Theni Consultation Centre',
    description:
      'Consultant Psychiatrist (MD Psychiatry) providing clinical psychiatric care, substance use recovery programs, and specialized mental health therapies in Theni.',
  },
];

export default function Gallery() {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  // Set document title
  useEffect(() => {
    document.title = 'Gallery | Aura De-Addiction Center';
    window.scrollTo(0, 0);
  }, []);

  const currentItem =
    activeLightboxIndex !== null ? SPIRAL_ITEMS[activeLightboxIndex] : null;

  // Lightbox navigation
  const handleNext = () => {
    setActiveLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % SPIRAL_ITEMS.length
    );
  };

  const handlePrev = () => {
    setActiveLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + SPIRAL_ITEMS.length) % SPIRAL_ITEMS.length
    );
  };

  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % SPIRAL_ITEMS.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + SPIRAL_ITEMS.length) % SPIRAL_ITEMS.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex]);

  // Memoized spiral items with interactive click-to-lightbox handlers
  const spiralImages = useMemo(
    () =>
      SPIRAL_ITEMS.map((item, index) => ({
        src: item.src,
        alt: item.alt,
        label: item.title,
        onClick: () => setActiveLightboxIndex(index),
      })),
    []
  );

  return (
    <div className="relative w-full min-h-[calc(100dvh-var(--aura-header-height,56px))] bg-white flex flex-col justify-center items-center overflow-hidden py-4 sm:py-8 select-none">
      {/* 3D Infinite Spiral Pure Showcase */}
      <div style={{ height: 'min(700px, calc(100dvh - 80px))', width: '100%', position: 'relative', overflow: 'hidden', background: '#ffffff' }}>
        <InfiniteSpiral
          items={spiralImages}
          animationMode="all"
          speed={0.55}
          radius={170}
          cardWidth={120}
          cardHeight={120}
          verticalSpacing={65}
          perspective={1000}
          cardRadius={12}
          centerScale={1.2}
          edgeBlur={6}
          cardsPerTurn={6}
          pauseOnHover={false}
          direction="up"
          rotation={0}
          cardTilt={0}
          edgeFade={0.3}
          imageFit="cover"
          grayscale={0}
        />
      </div>

      {/* =========================================================
          INTERACTIVE FULL-SCREEN LIGHTBOX MODAL (Image Only)
         ========================================================= */}
      <AnimatePresence>
        {currentItem && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={currentItem.title || currentItem.alt}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-md cursor-zoom-out"
            onClick={() => setActiveLightboxIndex(null)}
          >
            {/* Close Button Top Right */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex(null);
              }}
              className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Close image view"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Nav Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 sm:left-6 z-50 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Container — Image Only */}
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[92vw] max-h-[88vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentItem.image}
                alt={currentItem.alt}
                className="w-auto h-auto max-w-[92vw] max-h-[88vh] object-contain rounded-2xl select-none"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
