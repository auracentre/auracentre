/**
 * Motion Architecture & Animation Variants
 * RR De-Addiction Center ("Aura – For Better Life")
 *
 * Designed with a strict focus on mobile performance:
 * - Uses only hardware-accelerated CSS properties: transform (translate, scale) & opacity
 * - Calibrated natural spring & gentle bezier curves
 * - Reduced-motion friendly fallback properties
 */

export const TRANSITION_EASE_GENTLE = [0.22, 1, 0.36, 1];
export const TRANSITION_EASE_OUT = [0.16, 1, 0.3, 1];

export const DURATIONS = {
  instant: 0.1,
  fast: 0.22,
  normal: 0.4,
  slow: 0.65,
  preloader: 1.1,
};

/**
 * Standard Fade In
 */
export const fadeInVariants = {
  hidden: {
    opacity: 0,
  },
  visible: (customDelay = 0) => ({
    opacity: 1,
    transition: {
      duration: DURATIONS.normal,
      delay: customDelay,
      ease: TRANSITION_EASE_GENTLE,
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: DURATIONS.fast,
      ease: 'easeOut',
    },
  },
};

/**
 * Gentle Slide Up with Opacity Fade
 */
export const slideUpVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      delay: customDelay,
      ease: TRANSITION_EASE_GENTLE,
    },
  }),
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: DURATIONS.fast,
      ease: 'easeIn',
    },
  },
};

/**
 * Organic Scale In (Growth & Renewal)
 */
export const scaleInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },
  visible: (customDelay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATIONS.slow,
      delay: customDelay,
      ease: TRANSITION_EASE_GENTLE,
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: {
      duration: DURATIONS.fast,
      ease: 'easeIn',
    },
  },
};

/**
 * Container variant for staggered children
 */
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/**
 * Page Transitions for future React Router pages
 */
export const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: TRANSITION_EASE_GENTLE,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: DURATIONS.fast,
      ease: 'easeInOut',
    },
  },
};

/**
 * Pre-loader Specific Timeline Variants
 */
export const preloaderContainerVariants = {
  initial: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      when: 'afterChildren',
    },
  },
};

export const preloaderLogoVariants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: TRANSITION_EASE_GENTLE,
    },
  },
};

export const preloaderLeafVariants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    rotate: -12,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.9,
      delay: 0.2,
      ease: [0.34, 1.4, 0.64, 1], // delicate organic spring
    },
  },
};

export const preloaderTextVariants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.45,
      ease: TRANSITION_EASE_GENTLE,
    },
  },
};
