import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/Home';
import Doctors from '../pages/Doctors';
import Gallery from '../pages/Gallery';
import NotFound from '../pages/NotFound';

/**
 * AppRoutes Component
 * Central route configuration wrapped inside MainLayout shell.
 *
 * @param {Object} props
 * @param {Function} props.onTriggerLoader - Callback to trigger the preloader demo
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="crew" element={<Doctors />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="galleri" element={<Navigate to="/gallery" replace />} />
        <Route path="about" element={<Navigate to="/#about-aura" replace />} />
        <Route path="what-we-treat" element={<Navigate to="/#what-we-treat" replace />} />
        <Route path="approach" element={<Navigate to="/#what-we-treat" replace />} />
        <Route path="services" element={<Navigate to="/#our-services" replace />} />
        <Route path="our-services" element={<Navigate to="/#our-services" replace />} />
        <Route path="why-choose-us" element={<Navigate to="/#why-choose-us" replace />} />
        <Route path="facilities" element={<Navigate to="/#why-choose-us" replace />} />
        <Route path="contact" element={<Navigate to="/#contact" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
