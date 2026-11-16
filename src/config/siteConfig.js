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
      name: 'Theni — Branch',
      type: 'Branch',
      address: '128B/W9, Aruna Complex, Koduvilarpatti, Theni – 625534',
      phone: '7418661994',
      directionsUrl: 'https://maps.app.goo.gl/R5tQNixgxB4i5FqW7?g_st=ac',
    },
    dindigul: {
      name: 'Dindigul — Branch',
      type: 'Branch',
      address: '54, Ramachandra Nagar, Seventh Day School Backside, Natham Road, Dindigul – 624003',
      phone: '6380660702',
      directionsUrl: 'https://maps.app.goo.gl/i4vuVctm5zXGbNaP8',
    },
    coordinators: [
      { name: 'Abishek A', phone: '8883130957' },
      { name: 'Amanulla N', phone: '9994345448' },
    ],
    hours: '24/7 Intake & Emergency Support',
  },
  social: {
    instagram:
      'https://www.instagram.com/auradeaddictioncentre?srtk=ZndhbXFkNmZzOGJi&utm_source=qr',
    facebook: 'https://www.facebook.com/share/1K8zESxg7J/?mibextid=wwXIfr',
    youtube: 'https://youtube.com/@auradeaddictioncentre?si=fns1ebrmv29kcf6o',
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
