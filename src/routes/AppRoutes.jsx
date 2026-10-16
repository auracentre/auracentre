import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Programs from '../pages/Programs';
import Facilities from '../pages/Facilities';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';

/**
 * AppRoutes Component
 * Central route configuration wrapped inside MainLayout shell.
 *
 * @param {Object} props
 * @param {Function} props.onTriggerLoader - Callback to trigger the preloader demo
 */
export default function AppRoutes({ onTriggerLoader }) {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home onTriggerLoader={onTriggerLoader} />} />
        <Route path="about" element={<About />} />
        <Route path="programs" element={<Programs />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
