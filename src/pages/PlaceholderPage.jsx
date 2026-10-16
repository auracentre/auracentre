import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, ShieldCheck } from 'lucide-react';

export default function PlaceholderPage({ title, subtitle, category = 'Module' }) {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-aura-leaf-100 text-aura-leaf-800 text-xs font-semibold uppercase tracking-wider mb-4">
        <Clock className="w-3.5 h-3.5" />
        <span>{category} Architecture Ready</span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-aura-charcoal mb-4">
        {title}
      </h1>
      <p className="text-base text-aura-charcoal-muted max-w-xl mx-auto mb-8 leading-relaxed">
        {subtitle}
      </p>

      <div className="p-6 rounded-2xl bg-white border border-aura-leaf-100 shadow-card max-w-md mx-auto mb-8 text-left">
        <div className="flex items-center gap-3 mb-3">
          <ShieldCheck className="w-5 h-5 text-aura-leaf-600" />
          <h2 className="text-sm font-semibold text-aura-charcoal">Upcoming Implementation</h2>
        </div>
        <p className="text-xs text-aura-charcoal-muted leading-relaxed">
          The routing, layout shell, design tokens, and animation architecture are pre-configured. Content and data hooks for this section will be integrated in Phase 2.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-aura-leaf-600 text-white text-sm font-medium hover:bg-aura-leaf-700 transition-colors shadow-subtle"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}
