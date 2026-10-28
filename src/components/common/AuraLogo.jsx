import React from 'react';
import auraLogoImg from '../../assets/logo/aura-logo-transparent.png';
import auraLeafIcon from '../../assets/logo/aura-leaf-icon.png';

/**
 * AuraLogo Component
 * Renders the official Aura – For Better Life brand logo with transparent background.
 *
 * @param {'full' | 'compact' | 'icon'} variant - Layout variant
 * @param {string} className - Additional CSS classes
 * @param {boolean} showSubtitle - Whether to display De-Addiction Center subtitle
 * @param {string} alt - Accessibility alt text
 */
export default function AuraLogo({
  variant = 'full',
  className = '',
  imgClassName = '',
  showSubtitle = true,
  alt = 'Aura – For Better Life | De-Addiction Center',
  tone = 'default',
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  ...props
}) {
  const isWhite = tone === 'white';

  // Proportional sizing configuration
  const sizeMap = {
    sm: {
      img: 'h-8 sm:h-9',
      subtitle: 'text-[7.5px] sm:text-[8.5px] tracking-[0.2em] mt-0.5 pl-0.5',
    },
    md: {
      img: 'h-10 sm:h-12',
      subtitle: 'text-[8.5px] sm:text-[9.5px] tracking-[0.22em] mt-0.5 pl-1',
    },
    lg: {
      img: 'h-14 sm:h-16 md:h-[68px]',
      subtitle: 'text-[11px] sm:text-[12.5px] md:text-[13px] tracking-[0.25em] mt-1.5 pl-1',
    },
    xl: {
      img: 'h-16 sm:h-20 md:h-[84px]',
      subtitle: 'text-xs sm:text-[13.5px] md:text-sm tracking-[0.26em] mt-2 pl-1.5',
    },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  if (variant === 'icon') {
    return (
      <img
        src={auraLeafIcon}
        alt="Aura Leaf Emblem"
        className={`${currentSize.img} w-auto object-contain shrink-0 ${isWhite ? 'brightness-0 invert' : ''} ${imgClassName || className}`}
        style={isWhite ? { filter: 'brightness(0) invert(1)' } : undefined}
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
        className={`${imgClassName || currentSize.img} w-auto object-contain shrink-0 ${isWhite ? 'brightness-0 invert' : ''}`}
        style={isWhite ? { filter: 'brightness(0) invert(1)' } : undefined}
        loading="eager"
      />
      {variant === 'full' && showSubtitle && (
        <span
          className={`${currentSize.subtitle} font-semibold uppercase whitespace-nowrap select-none ${
            isWhite ? 'text-white' : 'text-aura-sage-600'
          }`}
        >
          De-Addiction Center
        </span>
      )}
    </div>
  );
}
