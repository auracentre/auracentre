import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto text-center">
      <div className="w-16 h-16 rounded-3xl bg-aura-leaf-100 text-aura-leaf-700 flex items-center justify-center mx-auto mb-6">
        <Compass className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-serif font-bold text-aura-charcoal mb-2">404</h1>
      <h2 className="text-xl font-semibold text-aura-charcoal mb-4">Page Not Found</h2>
      <p className="text-sm text-aura-charcoal-muted mb-8 leading-relaxed">
        The page you are looking for is either resting or does not exist. We invite you back to our peaceful home.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-aura-leaf-600 text-white text-sm font-semibold hover:bg-aura-leaf-700 transition-colors shadow-soft"
      >
        <Home className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
}
