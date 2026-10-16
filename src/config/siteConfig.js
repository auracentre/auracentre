/**
 * Aura Site Configuration & Metadata
 * Central constants for RR De-Addiction Center ("Aura – For Better Life")
 */
export const siteConfig = {
  brandName: 'Aura',
  tagline: 'For Better Life',
  centerName: 'RR De-Addiction & Rehabilitation Center',
  contact: {
    helpline: '+91 98765 43210',
    emergencyHelpline: '1800-123-AURA',
    email: 'care@auraclinic.org',
    address: 'Green Valley Serene Enclave, Wellness Road, Bangalore, India',
    hours: '24/7 Intake & Emergency Support',
  },
  routes: [
    { title: 'Home', path: '/' },
    { title: 'About Us', path: '/about' },
    { title: 'Recovery Programs', path: '/programs' },
    { title: 'Facilities', path: '/facilities' },
    { title: 'Contact', path: '/contact' },
  ],
  meta: {
    title: 'Aura – For Better Life | RR De-Addiction Center',
    description:
      'Compassionate, evidence-based addiction rehabilitation and mental healthcare offering medical detox, family therapy, and long-term renewal.',
  },
};

export default siteConfig;
