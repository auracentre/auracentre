/**
 * Aura Site Configuration & Metadata
 * Central constants for De-Addiction Center ("Aura – For Better Life")
 */
export const siteConfig = {
  brandName: 'Aura',
  tagline: 'For Better Life',
  centerName: 'De-Addiction & Rehabilitation Center',
  contact: {
    helpline: '7418661994',
    theni: {
      name: 'Theni — Main Centre',
      address: '128/W9, Aruna Complex, Kodu Vilarpatti, Theni – 625534',
      phone: '7418661994',
    },
    dindigul: {
      name: 'Dindigul — Branch',
      address: '54, Ramachandra Nagar, Seventh Day School Backside, Natham Road, Dindigul – 624003',
      phone: '6380660702',
    },
    coordinators: [
      { name: 'Abishek A', phone: '8883130957' },
      { name: 'Amanulla N', phone: '9994345448' },
    ],
    hours: '24/7 Intake & Emergency Support',
  },
  routes: [
    { title: 'Home', path: '/' },
    { title: 'About Us', path: '/#about-aura' },
    { title: 'What We Treat', path: '/#what-we-treat' },
    { title: 'Doctors', path: '/doctors' },
    { title: 'Our Services', path: '/#our-services' },
    { title: 'Why Choose Us', path: '/#why-choose-us' },
    { title: 'Gallery', path: '/gallery' },
    { title: 'Contact', path: '/#contact' },
  ],
  meta: {
    title: 'Aura – For Better Life | De-Addiction Center',
    description:
      'Compassionate, evidence-based addiction rehabilitation and mental healthcare offering medical detox, family therapy, and long-term renewal.',
  },
};

export default siteConfig;
