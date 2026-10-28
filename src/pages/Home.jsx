import React from 'react';
import Hero from '../components/home/Hero';
import TopBanner from '../components/home/TopBanner';
import AboutSection from '../components/home/AboutSection';
import WhatWeTreatSection from '../components/home/WhatWeTreatSection';
import OurServicesSection from '../components/home/OurServicesSection';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import ContactSection from '../components/home/ContactSection';

/**
 * HomePage Component
 * Features top panoramic brand banner after navbar,
 * followed by Hero, About Us, What We Treat, Our Services, Why Choose Us, and Contact Section.
 *
 * @param {Object} props
 * @param {Function} props.onTriggerLoader - Callback to trigger the preloader animation on demand
 */
export default function Home() {
  React.useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash) {
        const hashId = window.location.hash.replace('#', '');
        const el = document.getElementById(hashId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const timer = setTimeout(handleHashScroll, 120);
    window.addEventListener('hashchange', handleHashScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);

  return (
    <div className="relative overflow-x-clip bg-white">
      {/* Opening Full-Viewport Experience: Banner + Hero + Looping Ticker */}
      <section
        aria-label="Welcome to Aura De-Addiction Center"
        className="relative w-full min-h-[calc(100dvh-var(--aura-header-height,56px))] flex flex-col justify-between overflow-visible sm:overflow-hidden bg-white"
      >
        {/* Top Brand Banner immediately after Nav Bar */}
        <TopBanner />

        {/* Hero Section */}
        <Hero />
      </section>

      {/* Premium About Us Section — Aura De-Addiction Center */}
      <AboutSection />

      {/* What We Treat Section — Treatment Categories Showcase */}
      <WhatWeTreatSection />

      {/* Our Services Section — Comprehensive Clinical & Support Offerings */}
      <OurServicesSection />

      {/* Why Choose Us Section — The Aura Difference: A Path to Recovery */}
      <WhyChooseUsSection />


      {/* Complete Contact Section — We're Here to Help & Branch Locations */}
      <ContactSection />
    </div>
  );
}
