import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Crew & Specialist Assets
import abishekImg from '../assets/images/abishek-director.png';
import amanullaImg from '../assets/images/amanulla-cofounder.png';
import gowthamanImg from '../assets/images/gowthaman-medical-officer.png';

/**
 * Crew & Leadership Data
 */
const CREW_DATA = [
  {
    id: 'abishek-a',
    number: '01',
    role: 'FOUNDER',
    nameUpper: 'ABISHEK A',
    name: 'Abishek A',
    credentials: 'MSW, Certified Addiction Counselor',
    primarySpecialty: 'Founder',
    otherSpecialties: 'Aura De-Addiction Center • Rehabilitation & Recovery Leadership',
    image: abishekImg,
    alt: 'Founder Abishek A',
  },
  {
    id: 'amanulla-n',
    number: '02',
    role: 'CO-FOUNDER',
    nameUpper: 'AMANULLA N',
    name: 'Amanulla N',
    credentials: 'B.Sc., Certified Crisis Intervention Specialist',
    primarySpecialty: 'Co-Founder',
    otherSpecialties: 'Aura De-Addiction Center • Admissions & Patient Advocacy Leadership',
    image: amanullaImg,
    alt: 'Co-Founder Amanulla N',
  },
  {
    id: 'dr-gowthaman',
    number: '03',
    role: 'MEDICAL OFFICER',
    nameUpper: 'DR. T. GOWTHAMAN',
    name: 'Dr. T. Gowthaman',
    credentials: 'MBBS, Medical Officer',
    primarySpecialty: 'Medical Officer',
    otherSpecialties: 'Aura De-Addiction Center • Inpatient Medical Care & Detox Oversight',
    image: gowthamanImg,
    alt: 'Medical Officer Dr. T. Gowthaman',
  },
];

export default function Doctors() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMobileDoc, setSelectedMobileDoc] = useState(null);

  // SEO Title
  useEffect(() => {
    document.title = 'Our Crew & Leadership | Aura De-Addiction Center';
    window.scrollTo(0, 0);
  }, []);

  const activeDoc = CREW_DATA[activeIndex] || CREW_DATA[0];

  if (!activeDoc) {
    return null;
  }

  return (
    <div className="w-full bg-white text-gray-900 min-h-[calc(100vh-80px)] pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* =========================================================
            MOBILE VIEW (Visible on mobile/tablet screens < lg)
           ========================================================= */}
        <div className="block lg:hidden flex flex-col divide-y divide-gray-200/80">
          {CREW_DATA.map((doc) => (
            <div key={doc.id} className="py-6 first:pt-1 last:pb-6">
              {/* Top Header: 01 • ROLE               → */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider">
                  <span className="text-[#2F5C40] font-mono text-sm">{doc.number}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 uppercase tracking-widest truncate max-w-[220px] sm:max-w-xs">
                    {doc.role}
                  </span>
                </div>
                <span className="text-[#2F5C40] text-sm shrink-0" aria-hidden="true">
                  →
                </span>
              </div>

              {/* Body: Thumbnail on Left, Info on Right */}
              <div className="flex items-start gap-4">
                {/* Rounded Portrait Thumbnail */}
                <div className="w-[105px] h-[125px] sm:w-[120px] sm:h-[140px] shrink-0 rounded-2xl overflow-hidden bg-gray-100 shadow-xs border border-gray-100">
                  <img
                    src={doc.image}
                    alt={doc.alt || doc.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>

                {/* Right Details Column */}
                <div className="flex-1 min-w-0 flex flex-col justify-start">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight leading-snug">
                    {doc.name}
                  </h3>

                  <p className="text-sm font-semibold text-[#2F5C40] mt-0.5">
                    {doc.primarySpecialty}
                  </p>

                  <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                    {doc.otherSpecialties}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedMobileDoc(doc)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-gray-900 mt-2.5 hover:text-[#2F5C40] transition-colors cursor-pointer text-left w-fit"
                  >
                    <span>VIEW PROFILE</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================
            DESKTOP VIEW (Visible on screens >= lg)
           ========================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* LEFT COLUMN: Crew Roster List */}
          <div className="lg:col-span-7 flex flex-col divide-y-0">
            {CREW_DATA.map((doc, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className={`group w-full text-left py-5 sm:py-6 cursor-pointer transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gray-900 rounded-sm border-b ${
                    isActive ? 'border-gray-900 border-b-2' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  aria-pressed={isActive}
                >
                  {/* Number & Role Header */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs sm:text-sm tracking-wider uppercase font-semibold transition-colors duration-200 ${
                        isActive ? 'text-gray-900' : 'text-gray-400'
                      }`}
                    >
                      {doc.number}
                    </span>
                    <span
                      className={`text-xs sm:text-sm tracking-widest uppercase font-medium transition-colors duration-200 ${
                        isActive ? 'text-gray-900' : 'text-gray-400'
                      }`}
                    >
                      {doc.role}
                    </span>
                  </div>

                  {/* Member Name */}
                  <h2
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-bold tracking-tight uppercase font-sans mt-2 transition-colors duration-200 leading-[1.15] ${
                      isActive
                        ? 'text-gray-900'
                        : 'text-gray-300 group-hover:text-gray-400'
                    }`}
                  >
                    {doc.nameUpper}
                  </h2>

                  {/* Specialties & Sub-specialties */}
                  <p className="mt-2 text-sm sm:text-base leading-relaxed">
                    <span
                      className={`font-semibold transition-colors duration-200 ${
                        isActive ? 'text-gray-800' : 'text-gray-400'
                      }`}
                    >
                      {doc.primarySpecialty}
                    </span>
                    {doc.otherSpecialties && (
                      <span
                        className={`transition-colors duration-200 ${
                          isActive ? 'text-gray-500' : 'text-gray-400'
                        }`}
                      >
                        {' '}• {doc.otherSpecialties}
                      </span>
                    )}
                  </p>
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Active Member Portrait & Caption (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <div className="w-full max-w-[420px] mx-auto lg:max-w-none">
              {/* Portrait Image Frame */}
              <div className="relative w-full aspect-[4/5] max-h-[360px] sm:max-h-[400px] lg:max-h-[calc(100vh-210px)] rounded-[26px] overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeDoc.id}
                    src={activeDoc.image}
                    alt={activeDoc.alt}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="w-full h-full object-cover object-top"
                  />
                </AnimatePresence>
              </div>

              {/* Caption Directly Below Image */}
              <div className="mt-3 sm:mt-4">
                <p className="text-xs sm:text-sm font-semibold tracking-widest text-gray-500 uppercase">
                  {activeDoc.role}
                </p>
                <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-normal text-gray-950 font-sans tracking-tight mt-1 leading-snug">
                  {activeDoc.name}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Profile Preview Modal */}
      <AnimatePresence>
        {selectedMobileDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden">
                <img
                  src={selectedMobileDoc.image}
                  alt={selectedMobileDoc.name}
                  className="w-full h-full object-cover object-top"
                />
                <button
                  type="button"
                  onClick={() => setSelectedMobileDoc(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold tracking-widest text-[#2F5C40] uppercase">
                  {selectedMobileDoc.role}
                </p>
                <h4 className="text-xl font-bold text-gray-900 mt-1">
                  {selectedMobileDoc.name}
                </h4>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  {selectedMobileDoc.otherSpecialties}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
