import React from 'react';
import { motion } from 'framer-motion';
import { pageTransitionVariants } from '../../utils/motionVariants';
import useMotionPreference from '../../hooks/useMotionPreference';

/**
 * PageTransition Component
 * Wraps page-level components for smooth, non-disruptive navigation transitions.
 *
 * @param {React.ReactNode} children
 * @param {string} className
 */
export default function PageTransition({ children, className = '' }) {
  const prefersReducedMotion = useMotionPreference();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}
