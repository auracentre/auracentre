import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import auraLogoImg from '../../assets/logo/aura-logo-transparent.png';
import { LOGO_PIECES, LOGO_ROWS, LOGO_COLS } from './logoPiecesData';
import useMotionPreference from '../../hooks/useMotionPreference';

/**
 * Creative 45-Piece Logo Assembly PreLoader Component
 *
 * Concept:
 * - The official Aura logo is divided into 45 authentic image tiles.
 * - All 45 pieces simultaneously fly in from different sides and angles (top, bottom, left, right, diagonals).
 * - Each piece rotates, scales, and navigates inward to assemble the complete Aura logo at the center.
 * - Once fully assembled, the logo locks together seamlessly, pauses, and dismisses into the site.
 *
 * @param {boolean} isLoading - External loading state
 * @param {Function} onComplete - Callback executed when animation completes
 * @param {number} minDisplayTime - Total time in ms before dismissing (default: 2500ms)
 */
export default function PreLoader({
  isLoading = true,
  onComplete,
  minDisplayTime = 2500,
}) {
  const prefersReducedMotion = useMotionPreference();
  const [internalVisible, setInternalVisible] = useState(true);
  const [isAssembled, setIsAssembled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      const quickTimer = setTimeout(() => {
        setInternalVisible(false);
        if (onComplete) onComplete();
      }, 200);
      return () => clearTimeout(quickTimer);
    }

    // Mark as assembled after convergence animation completes (~1.45s)
    const assembleTimer = setTimeout(() => {
      setIsAssembled(true);
    }, 1450);

    // Complete preloader dismissal
    const dismissTimer = setTimeout(() => {
      setInternalVisible(false);
      if (onComplete) onComplete();
    }, minDisplayTime);

    return () => {
      clearTimeout(assembleTimer);
      clearTimeout(dismissTimer);
    };
  }, [minDisplayTime, onComplete, prefersReducedMotion]);

  if (!isLoading && !internalVisible) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {internalVisible && (
        <motion.div
          key="aura-mosaic-preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading Aura De-Addiction Center"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: prefersReducedMotion ? 0.1 : 0.5,
              ease: [0.4, 0, 0.2, 1],
            },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-aura-warm-white select-none px-4"
          style={{ backgroundColor: '#FAF9F4' }}
        >
          {/* Subtle soft radiant ambient aura in background */}
          <div
            className="pointer-events-none absolute h-80 w-80 rounded-full bg-aura-leaf-100/30 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute h-72 w-72 rounded-full bg-aura-blush-100/30 blur-3xl translate-y-6"
            aria-hidden="true"
          />

          {/* Logo Assembly Container */}
          <div className="relative z-10 flex flex-col items-center justify-center max-w-full">
            {/* The 45-Piece Assembly Stage */}
            <div
              className="relative w-[300px] sm:w-[420px] md:w-[480px] aspect-[1113/749] max-w-full"
              style={{
                perspective: '1200px',
              }}
            >
              {/* Full seamless unified logo underneath that smoothly fades in once converged */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isAssembled ? 1 : 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="absolute inset-0 pointer-events-none"
              >
                <img
                  src={auraLogoImg}
                  alt="Aura – For Better Life"
                  className="w-full h-full object-contain filter drop-shadow-subtle"
                />
              </motion.div>

              {/* 45 individual animated logo pieces */}
              {LOGO_PIECES.map((piece) => {
                const cellLeft = `${(piece.col / LOGO_COLS) * 100}%`;
                const cellTop = `${(piece.row / LOGO_ROWS) * 100}%`;
                const cellWidth = `${100 / LOGO_COLS}%`;
                const cellHeight = `${100 / LOGO_ROWS}%`;

                return (
                  <motion.div
                    key={piece.id}
                    initial={
                      prefersReducedMotion
                        ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
                        : {
                            x: piece.initX,
                            y: piece.initY,
                            rotate: piece.initRotate,
                            scale: 0.6,
                            opacity: 0,
                          }
                    }
                    animate={{
                      x: 0,
                      y: 0,
                      rotate: 0,
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      duration: prefersReducedMotion ? 0.01 : 1.35,
                      delay: prefersReducedMotion ? 0 : piece.delay,
                      ease: [0.16, 1, 0.3, 1], // Smooth organic deceleration
                    }}
                    className="absolute overflow-hidden pointer-events-none will-change-transform"
                    style={{
                      left: cellLeft,
                      top: cellTop,
                      width: cellWidth,
                      height: cellHeight,
                      // Subtle tile outline during flight that disappears on assembly
                      boxShadow: isAssembled
                        ? 'none'
                        : '0 4px 12px rgba(47, 92, 64, 0.12)',
                    }}
                  >
                    {/* The logo image slice mapped to this exact grid coordinate */}
                    <img
                      src={auraLogoImg}
                      alt=""
                      aria-hidden="true"
                      className="absolute max-w-none pointer-events-none"
                      style={{
                        width: `${LOGO_COLS * 100}%`,
                        height: `${LOGO_ROWS * 100}%`,
                        left: `${-piece.col * 100}%`,
                        top: `${-piece.row * 100}%`,
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Subtitle tag that gently appears once the logo is assembled */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{
                opacity: isAssembled ? 0.85 : 0,
                y: isAssembled ? 0 : 6,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mt-4 text-center"
            >
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-aura-sage-700">
                RR De-Addiction Center
              </span>
            </motion.div>
          </div>

          {/* Screen reader announcement */}
          <span className="sr-only">Aura – For Better Life</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
