import React from 'react';
import { motion } from 'framer-motion';
import { fadeInVariants, slideUpVariants } from '../../utils/motionVariants';
import useMotionPreference from '../../hooks/useMotionPreference';

/**
 * Reusable FadeIn animation wrapper component
 *
 * @param {React.ReactNode} children - Elements to animate
 * @param {'fade' | 'slide'} variant - Animation preset
 * @param {number} delay - Stagger or delay in seconds
 * @param {string} className - Optional Tailwind CSS class names
 */
export default function FadeIn({
  children,
  variant = 'slide',
  delay = 0,
  className = '',
  ...props
}) {
  const prefersReducedMotion = useMotionPreference();

  if (prefersReducedMotion) {
    return <div className={className} {...props}>{children}</div>;
  }

  const selectedVariants = variant === 'fade' ? fadeInVariants : slideUpVariants;

  return (
    <motion.div
      variants={selectedVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={delay}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
