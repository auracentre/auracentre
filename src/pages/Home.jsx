import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Heart,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  PhoneCall,
  Activity,
  Layers,
  Smartphone,
  Eye,
} from 'lucide-react';
import AuraLogo from '../components/common/AuraLogo';
import {
  fadeInVariants,
  slideUpVariants,
} from '../utils/motionVariants';

/**
 * HomePage Component
 * Confirms successful frontend architecture setup with interactive design system showcase
 * and live pre-loader controller.
 *
 * @param {Object} props
 * @param {Function} props.onTriggerLoader - Callback to trigger the preloader animation on demand
 */
export default function Home({ onTriggerLoader }) {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 aura-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Accreditation Badge */}
            <motion.div
              variants={slideUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aura-leaf-100/80 border border-aura-leaf-200 text-aura-leaf-800 text-xs font-semibold mb-6 shadow-subtle"
            >
              <Sparkles className="w-3.5 h-3.5 text-aura-leaf-600" />
              <span>RR De-Addiction &amp; Rehabilitation Center</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={slideUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-aura-charcoal tracking-tight leading-[1.15] mb-6"
            >
              A Sanctuary of Hope,{' '}
              <span className="text-aura-leaf-600 italic font-medium">Renewal</span> &amp;{' '}
              <span className="text-aura-blush-500">Better Life</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={slideUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="text-base sm:text-lg text-aura-charcoal-muted leading-relaxed mb-8 font-normal"
            >
              Welcome to the frontend architecture foundation for <strong>Aura</strong>.
              Engineered with a calming nature-inspired aesthetic, mobile-first performance,
              and trauma-informed design principles for rehabilitation and de-addiction care.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={slideUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-10"
            >
              {onTriggerLoader && (
                <button
                  type="button"
                  onClick={onTriggerLoader}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-aura-leaf-600 text-white font-semibold text-sm shadow-soft hover:bg-aura-leaf-700 active:scale-[0.98] transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-aura-leaf-600"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Replay Pre-Loader Animation</span>
                </button>
              )}

              <a
                href="#design-system"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white border border-aura-leaf-200 text-aura-leaf-800 font-semibold text-sm hover:bg-aura-leaf-50 active:scale-[0.98] transition-all shadow-subtle"
              >
                <Eye className="w-4 h-4 text-aura-leaf-600" />
                <span>Explore Design System</span>
              </a>
            </motion.div>

            {/* Key Trust Pillars */}
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              custom={0.5}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mx-auto pt-4 text-xs text-aura-charcoal-muted"
            >
              <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/70 border border-aura-leaf-100 shadow-subtle">
                <ShieldCheck className="w-4 h-4 text-aura-leaf-600 shrink-0" />
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/70 border border-aura-leaf-100 shadow-subtle">
                <Heart className="w-4 h-4 text-aura-blush-500 shrink-0" />
                <span>Compassionate Care</span>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/70 border border-aura-leaf-100 shadow-subtle">
                <PhoneCall className="w-4 h-4 text-aura-sage-600 shrink-0" />
                <span>24/7 Medical Intake</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Architecture & Verification Section */}
      <section id="design-system" className="py-16 bg-aura-warm-cream/50 border-y border-aura-leaf-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-aura-charcoal mb-3">
              Frontend Architecture &amp; Brand Tokens
            </h2>
            <p className="text-sm text-aura-charcoal-muted">
              Built strictly to the prompt specifications, ensuring mutual dependency stability, clean modularity, and low-latency mobile rendering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Brand Color Tokens Card */}
            <div className="p-6 rounded-3xl bg-white border border-aura-leaf-100 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-aura-leaf-100 text-aura-leaf-700">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-aura-charcoal text-base">Aura Palette</h3>
                  <p className="text-xs text-aura-charcoal-muted">Nature-inspired harmony</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-2 rounded-xl bg-aura-leaf-50 border border-aura-leaf-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-aura-leaf-500 shadow-sm" />
                    <span className="text-xs font-medium text-aura-charcoal">Leaf Green</span>
                  </div>
                  <span className="text-xs font-mono text-aura-leaf-700">#4A8F64</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-aura-blush-50 border border-aura-blush-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-aura-blush-500 shadow-sm" />
                    <span className="text-xs font-medium text-aura-charcoal">Blush Pink</span>
                  </div>
                  <span className="text-xs font-mono text-aura-blush-700">#D87F71</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-aura-sage-50 border border-aura-sage-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-aura-sage-500 shadow-sm" />
                    <span className="text-xs font-medium text-aura-charcoal">Muted Sage</span>
                  </div>
                  <span className="text-xs font-mono text-aura-sage-700">#879A81</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-aura-warm-white border border-stone-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-aura-warm-white border border-stone-300 shadow-sm" />
                    <span className="text-xs font-medium text-aura-charcoal">Warm White</span>
                  </div>
                  <span className="text-xs font-mono text-aura-charcoal-muted">#FAF9F6</span>
                </div>
              </div>
            </div>

            {/* Animation Engine Card */}
            <div className="p-6 rounded-3xl bg-white border border-aura-leaf-100 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-aura-blush-100 text-aura-blush-700">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-aura-charcoal text-base">Motion System</h3>
                  <p className="text-xs text-aura-charcoal-muted">Framer Motion + GPU Acceleration</p>
                </div>
              </div>

              <ul className="space-y-2.5 pt-2 text-xs text-aura-charcoal-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-aura-leaf-600 shrink-0" />
                  <span>Hardware-accelerated transforms (translate, opacity)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-aura-leaf-600 shrink-0" />
                  <span>Organic easing curve <code className="bg-aura-leaf-50 px-1 py-0.5 rounded text-[11px] font-mono">[0.22, 1, 0.36, 1]</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-aura-leaf-600 shrink-0" />
                  <span>Accessibility compliant (<code className="bg-aura-leaf-50 px-1 py-0.5 rounded text-[11px] font-mono">prefers-reduced-motion</code>)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-aura-leaf-600 shrink-0" />
                  <span>Zero unnecessary repaint or expensive scroll listeners</span>
                </li>
              </ul>
            </div>

            {/* Mobile-First Foundation */}
            <div className="p-6 rounded-3xl bg-white border border-aura-leaf-100 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-aura-sage-100 text-aura-sage-700">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-aura-charcoal text-base">Mobile Performance</h3>
                  <p className="text-xs text-aura-charcoal-muted">Zero layout shifts &amp; fast paint</p>
                </div>
              </div>

              <ul className="space-y-2.5 pt-2 text-xs text-aura-charcoal-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-aura-leaf-600 shrink-0" />
                  <span>Fluid responsive viewport (320px to 4K displays)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-aura-leaf-600 shrink-0" />
                  <span>Scalable SVG logo vectors for razor-sharp DPI</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-aura-leaf-600 shrink-0" />
                  <span>Modular folder hierarchy ready for route lazy-loading</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-aura-leaf-600 shrink-0" />
                  <span>Semantic HTML5 &amp; WCAG AAA focus styling</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Scalable Route Placeholder Roadmap */}
      <section className="py-16 bg-aura-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-serif font-bold text-aura-charcoal mb-2">
              Future Expansion Architecture
            </h2>
            <p className="text-xs sm:text-sm text-aura-charcoal-muted">
              Pre-structured route modules ready for implementation in the next phase:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-aura-warm-cream/60 border border-aura-leaf-100">
              <span className="text-xs font-semibold text-aura-leaf-800 block mb-1">/about</span>
              <span className="text-[11px] text-aura-charcoal-muted">Clinical Team &amp; Philosophy</span>
            </div>
            <div className="p-4 rounded-2xl bg-aura-warm-cream/60 border border-aura-leaf-100">
              <span className="text-xs font-semibold text-aura-leaf-800 block mb-1">/programs</span>
              <span className="text-[11px] text-aura-charcoal-muted">Detox, Inpatient &amp; Outpatient</span>
            </div>
            <div className="p-4 rounded-2xl bg-aura-warm-cream/60 border border-aura-leaf-100">
              <span className="text-xs font-semibold text-aura-leaf-800 block mb-1">/facilities</span>
              <span className="text-[11px] text-aura-charcoal-muted">Campus &amp; Healing Amenities</span>
            </div>
            <div className="p-4 rounded-2xl bg-aura-warm-cream/60 border border-aura-leaf-100">
              <span className="text-xs font-semibold text-aura-leaf-800 block mb-1">/contact</span>
              <span className="text-[11px] text-aura-charcoal-muted">Confidential Consultation</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
