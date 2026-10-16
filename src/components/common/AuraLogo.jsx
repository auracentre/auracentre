import React from 'react';
import auraLogoImg from '../../assets/logo/aura-logo-transparent.png';
import auraLeafIcon from '../../assets/logo/aura-leaf-icon.png';

/**
 * AuraLogo Component
 * Renders the official Aura – For Better Life brand logo with transparent background.
 *
 * @param {'full' | 'compact' | 'icon'} variant - Layout variant
 * @param {string} className - Additional CSS classes
 * @param {boolean} showSubtitle - Whether to display RR De-Addiction Center subtitle
 * @param {string} alt - Accessibility alt text
 */
export default function AuraLogo({
  variant = 'full',
  className = '',
  showSubtitle = true,
  alt = 'Aura – For Better Life | RR De-Addiction Center',
  ...props
}) {
  if (variant === 'icon') {
    return (
      <img
        src={auraLeafIcon}
        alt="Aura Leaf Emblem"
        className={`h-10 w-auto object-contain shrink-0 ${className}`}
        loading="eager"
        {...props}
      />
    );
  }

  return (
    <div className={`inline-flex flex-col items-start justify-center ${className}`} {...props}>
      <img
        src={auraLogoImg}
        alt={alt}
        className="h-10 sm:h-12 w-auto object-contain shrink-0"
        loading="eager"
      />
      {variant === 'full' && showSubtitle && (
        <span className="text-[8.5px] sm:text-[9.5px] font-semibold tracking-[0.22em] uppercase text-aura-sage-600 mt-0.5 pl-1 whitespace-nowrap select-none">
          RR De-Addiction Center
        </span>
      )}
    </div>
  );
}
