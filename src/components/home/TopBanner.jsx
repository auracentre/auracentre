import React from 'react';
import bannerWebp from '../../assets/images/aura-top-banner.webp';
import bannerPng from '../../assets/images/aura-top-banner.png';

/**
 * TopBanner Component
 * Sleek, compact panoramic brand banner positioned immediately after the navigation bar.
 */
export default function TopBanner() {
  return (
    <div
      aria-label="Aura Brand Banner"
      className="w-full shrink-0 relative overflow-hidden bg-white border-b border-[#E8ECE4]"
    >
      <div className="w-full max-w-[2126px] mx-auto">
        <picture>
          <source srcSet={bannerWebp} type="image/webp" />
          <img
            src={bannerPng}
            alt="Aura De-Addiction Center — For Better Life"
            className="w-full h-[180px] min-[360px]:h-[200px] min-[400px]:h-[225px] min-[480px]:h-[250px] sm:h-[150px] md:h-[170px] lg:h-[180px] xl:h-[195px] object-cover object-center select-none block"
            loading="eager"
            decoding="async"
            width={2126}
            height={740}
          />
        </picture>
      </div>
    </div>
  );
}
