import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Contact Route Redirect
 *
 * The Contact section is integrated into the bottom of the landing page (/#contact).
 * Any direct navigation to /contact is immediately redirected to /#contact.
 */
export default function Contact() {
  return <Navigate to="/#contact" replace />;
}
