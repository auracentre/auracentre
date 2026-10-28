import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// Gallery Image Assets
import centerArchitectureImg from '../assets/images/aura-center-architecture.jpg';
import patientSuiteImg from '../assets/images/aura-patient-suite.jpg';
import yogaHallImg from '../assets/images/aura-yoga-hall.jpg';
import therapySanctuaryImg from '../assets/images/aura-therapy-sanctuary.jpg';
import sanctuaryGardensImg from '../assets/images/aura-sanctuary-gardens.jpg';
import mindfulnessAtriumImg from '../assets/images/aura-mindfulness-atrium.jpg';
import recoveryEnvironmentImg from '../assets/images/aura-recovery-environment.jpg';
import topBannerImg from '../assets/images/aura-top-banner.png';
import heroCenterImg from '../assets/images/aura-hero-center.png';
import facilityBuildingImg from '../assets/images/aura-facility-enhanced.jpg';
import InfiniteSpiral from '../components/common/InfiniteSpiral';

/**
 * Complete 3D Infinite Spiral Campus Items Data
 */
const SPIRAL_ITEMS = [
  {
    id: 'campus-architecture',
    src: centerArchitectureImg,
    image: centerArchitectureImg,
    alt: 'Exterior architectural photograph of Aura De-Addiction Center surrounded by lush greenery',
    title: 'Main Clinical Campus & Architecture',
    categoryLabel: 'Campus & Architecture',
    location: 'Theni — Main Campus',
    description:
      'Contemporary eco-conscious healthcare architecture surrounded by calming indigenous trees, expansive open courtyards, and natural ventilation designed to promote tranquility.',
    highlights: ['Natural stone & eco finishes', 'Open courtyards', 'Private perimeter'],
  },
  {
    id: 'dindigul-facility',
    src: facilityBuildingImg,
    image: facilityBuildingImg,
    alt: 'Aura De-Addiction Center Dindigul Facility',
    title: 'Dindigul Clinical Sanctuary & Campus',
    categoryLabel: 'Campus & Architecture',
    location: 'Dindigul — Main Facility',
    description:
      'The modern Dindigul residential clinical facility featuring private counselling suites, structured rehabilitation lounges, and 24/7 psychiatric and medical emergency support.',
    highlights: ['24/7 Intake & medical post', 'Private consultation rooms', 'Secure rehabilitation campus'],
  },
  {
    id: 'private-recovery-suite',
    src: patientSuiteImg,
    image: patientSuiteImg,
    alt: 'Spacious private recovery bedroom with floor-to-ceiling garden views and warm wooden accents',
    title: 'Private Executive Recovery Suite',
    categoryLabel: 'Suites & Living Quarters',
    location: 'Theni & Dindigul',
    description:
      'Designed to provide unconditional dignity, privacy, and restful rejuvenation. Features floor-to-ceiling views of private landscaped gardens, organic cotton linens, and climate control.',
    highlights: ['En-suite private bath', 'Garden-facing glass doors', 'Ergonomic furnishings'],
  },
  {
    id: 'yoga-meditation-hall',
    src: yogaHallImg,
    image: yogaHallImg,
    alt: 'Sunlit polished wood yoga and meditation hall with bamboo garden view',
    title: 'Zen Meditation & Sound Healing Hall',
    categoryLabel: 'Therapy & Meditation',
    location: 'Theni Sanctuary',
    description:
      'A peaceful sanctuary with natural wood flooring, acoustic clarity, and expansive views into bamboo gardens where daily morning yoga, somatic breathwork, and sound meditations occur.',
    highlights: ['Tibetan singing bowls', 'Bamboo garden backdrop', 'Natural cross-ventilation'],
  },
  {
    id: 'therapy-sanctuary',
    src: therapySanctuaryImg,
    image: therapySanctuaryImg,
    alt: 'Quiet, warmly-lit psychotherapy consultation room with comfortable armchairs',
    title: 'Individual Psychotherapy & Consultation Suite',
    categoryLabel: 'Therapy & Meditation',
    location: 'Clinical Wing',
    description:
      'A quiet, confidential clinical environment designed for one-on-one psychiatric evaluations, cognitive behavioral therapy, and trauma processing in deep psychological comfort.',
    highlights: ['Acoustic soundproofing', 'Supportive seating', 'Confidential space'],
  },
  {
    id: 'sanctuary-gardens',
    src: sanctuaryGardensImg,
    image: sanctuaryGardensImg,
    alt: 'Lush green landscaped botanical garden paths with seating areas and flowers',
    title: 'Restorative Botanical & Herbal Walkways',
    categoryLabel: 'Gardens & Nature',
    location: 'Outdoor Healing Grounds',
    description:
      'Winding walking paths lined with indigenous medicinal flora, aromatic herbs, and shaded gazebos where patients take mindful morning constitutionals and reflect in open air.',
    highlights: ['Medicinal herbal plants', 'Shaded reflexology paths', 'Tranquil sitting gazebos'],
  },
  {
    id: 'mindfulness-atrium',
    src: mindfulnessAtriumImg,
    image: mindfulnessAtriumImg,
    alt: 'Expansive indoor garden atrium bathed in soft natural daylight',
    title: 'Central Sunlit Mindfulness Atrium',
    categoryLabel: 'Therapy & Meditation',
    location: 'Central Pavilion',
    description:
      'A sky-lit indoor sanctuary that bridges exterior nature with interior safety. Ideal for small group discussions, reading, and gentle communal fellowship during recovery milestones.',
    highlights: ['Natural skylight illumination', 'Living indoor greenery', 'Calm acoustics'],
  },
  {
    id: 'recovery-environment',
    src: recoveryEnvironmentImg,
    image: recoveryEnvironmentImg,
    alt: 'Warm, spotless residential corridor and recovery living quarters',
    title: 'Residential Recovery Lounge & Corridor',
    categoryLabel: 'Suites & Living Quarters',
    location: 'Residential Wing',
    description:
      'Immaculately maintained residential quarters providing comfortable reading nooks, supportive group lounges, and round-the-clock nursing access for every resident.',
    highlights: ['24/7 Nurse monitoring post', 'Quiet reading library', 'Spotless sanitized care'],
  },
  {
    id: 'courtyard-pavilion',
    src: heroCenterImg,
    image: heroCenterImg,
    alt: 'Courtyard architecture with tranquil outdoor family visiting pavilion',
    title: 'Central Courtyard & Family Gathering Pavilion',
    categoryLabel: 'Campus & Architecture',
    location: 'Main Center Grounds',
    description:
      'A serene outdoor pavilion with shaded seating designated for supportive family visitations, counseling orientations, and milestone celebration ceremonies.',
    highlights: ['Family visitation seating', 'Landscaped water fountains', 'Safe private boundary'],
  },
  {
    id: 'top-banner-nature',
    src: topBannerImg,
    image: topBannerImg,
    alt: 'Panoramic vista of lush green hillside sanctuary grounds and open blue skies',
    title: 'Panoramic Western Ghats Mountain Views',
    categoryLabel: 'Gardens & Nature',
    location: 'Theni Foothills',
    description:
      'Surrounded by the serene foothills of the Western Ghats, the sanctuary offers clean mountain air, sweeping green vistas, and isolation from metropolitan noise and relapse triggers.',
    highlights: ['Unpolluted mountain air', 'Natural barrier from city triggers', 'Expansive skyline'],
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
          cardWidth={110}
          cardHeight={110}
          verticalSpacing={60}
          perspective={1000}
          cardRadius={12}
          centerScale={1.2}
          edgeBlur={6}
          cardsPerTurn={7}
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
