import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import AuraLogo from '../common/AuraLogo';

export default function Footer() {
  return (
    <footer className="bg-aura-leaf-900 text-aura-warm-sand pt-16 pb-12 border-t border-aura-leaf-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-aura-leaf-800/80">
          {/* Brand & Purpose Column */}
          <div className="flex flex-col gap-4">
            <div className="bg-aura-warm-white/95 p-3 rounded-2xl w-fit shadow-subtle">
              <AuraLogo variant="full" className="h-10 w-auto" />
            </div>
            <p className="text-sm text-aura-warm-sand/80 leading-relaxed font-normal">
              Aura – RR De-Addiction Center is dedicated to compassionate, science-backed rehabilitation, healing minds and restoring dignity. We walk beside you toward a renewed life.
            </p>
            <div className="flex items-center gap-2 text-xs text-aura-leaf-200 mt-2 bg-aura-leaf-800/60 p-2.5 rounded-xl border border-aura-leaf-700/60">
              <ShieldCheck className="w-4 h-4 text-aura-blush-300 shrink-0" />
              <span>Registered Healthcare &amp; Certified Psychiatric Rehabilitation</span>
            </div>
          </div>

          {/* Healing Programs */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-aura-warm-white uppercase mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-aura-leaf-300" />
              <span>Recovery Programs</span>
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-aura-warm-sand/80">
              <li>
                <span className="hover:text-aura-warm-white transition-colors cursor-pointer">
                  Alcohol De-Addiction &amp; Detox
                </span>
              </li>
              <li>
                <span className="hover:text-aura-warm-white transition-colors cursor-pointer">
                  Substance &amp; Drug Rehabilitation
                </span>
              </li>
              <li>
                <span className="hover:text-aura-warm-white transition-colors cursor-pointer">
                  Dual Diagnosis &amp; Mood Support
                </span>
              </li>
              <li>
                <span className="hover:text-aura-warm-white transition-colors cursor-pointer">
                  Behavioral &amp; Digital Addiction
                </span>
              </li>
              <li>
                <span className="hover:text-aura-warm-white transition-colors cursor-pointer">
                  Relapse Prevention &amp; Aftercare
                </span>
              </li>
            </ul>
          </div>

          {/* Support & Community */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-aura-warm-white uppercase mb-4 flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-aura-blush-300" />
              <span>Family &amp; Patient Care</span>
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-aura-warm-sand/80">
              <li>
                <span className="hover:text-aura-warm-white transition-colors cursor-pointer">
                  Family Therapy Sessions
                </span>
              </li>
              <li>
                <span className="hover:text-aura-warm-white transition-colors cursor-pointer">
                  Nutritional &amp; Holistic Wellness
                </span>
              </li>
              <li>
                <span className="hover:text-aura-warm-white transition-colors cursor-pointer">
                  Inpatient Living Facilities
                </span>
              </li>
              <li>
                <span className="hover:text-aura-warm-white transition-colors cursor-pointer">
                  Confidential Admission Guide
                </span>
              </li>
              <li>
                <span className="hover:text-aura-warm-white transition-colors cursor-pointer">
                  Privacy &amp; Patient Rights
                </span>
              </li>
            </ul>
          </div>

          {/* Immediate Contact & Address */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-aura-warm-white uppercase mb-4">
              Get in Touch
            </h3>
            <address className="not-italic flex flex-col gap-3 text-sm text-aura-warm-sand/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-aura-leaf-300 mt-1 shrink-0" />
                <span>RR De-Addiction Center Campus, Green Valley Road, Serene Enclave</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-aura-blush-300 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-aura-warm-white transition-colors">
                  +91 98765 43210 (24/7 Support)
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-aura-leaf-300 shrink-0" />
                <a href="mailto:care@auraclinic.org" className="hover:text-aura-warm-white transition-colors">
                  care@auraclinic.org
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar & Medical Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-aura-warm-sand/60 text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} RR De-Addiction Center ("Aura – For Better Life"). All rights reserved.
          </p>
          <p className="max-w-xl text-[11px] leading-relaxed">
            Medical Disclaimer: All clinical programs are supervised by certified psychiatric and medical professionals. If you or a loved one are facing an acute emergency, please call emergency services immediately.
          </p>
        </div>
      </div>
    </footer>
  );
}
