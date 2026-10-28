import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * About Page
 * Redirects immediately to the unified About Us section on the Home page.
 */
export default function About() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/#about-aura', { replace: true });
  }, [navigate]);

  return null;
}
