import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import PreLoader from './components/loader/PreLoader';
import AppRoutes from './routes/AppRoutes';

/**
 * Root Application Component
 * Manages initial loading transition and router encapsulation.
 */
export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  const handleTriggerPreloader = () => {
    setShowPreloader(true);
  };

  return (
    <BrowserRouter>
      {/* Nature-inspired initial pre-loader */}
      {showPreloader && (
        <PreLoader
          isLoading={showPreloader}
          onComplete={handlePreloaderComplete}
          minDisplayTime={2500}
        />
      )}

      {/* Main Application Routes */}
      <AppRoutes onTriggerLoader={handleTriggerPreloader} />
    </BrowserRouter>
  );
}
