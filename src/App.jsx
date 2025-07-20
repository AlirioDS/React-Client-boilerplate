import React, { Suspense, lazy } from 'react';
import { APP_INFO, LOADING_MESSAGES } from './constants';
import './App.css';

// Lazy loading components for better performance
const Header = lazy(() => import('@components/Header.jsx'));
const Footer = lazy(() => import('@components/Footer.jsx'));
const PerformanceExample = lazy(() => import('@components/PerformanceExample.jsx'));
const PerformanceStatus = lazy(() => import('@components/PerformanceStatus.jsx'));

/**
 * Main App Component
 * 
 * Features:
 * - Lazy loading with Suspense for optimal performance
 * - React 19 modern patterns
 * - Responsive design with semantic HTML
 * 
 * @returns {JSX.Element} The main application component
 */
function App() {
  return (
    <div className="App">
      <Suspense fallback={<div className="loading">{LOADING_MESSAGES.HEADER}</div>}>
        <Header />
      </Suspense>
      
      <main className="App-main">
        <section className="hero-section">
          <h1 className="App-title">
            {APP_INFO.NAME}
          </h1>
          <p className="App-description">
            {APP_INFO.DESCRIPTION}
          </p>
          
          <Suspense fallback={<div className="loading">{LOADING_MESSAGES.MONITOR}</div>}>
            <PerformanceStatus />
          </Suspense>
        </section>

        <section className="demo-section">
          <Suspense fallback={<div className="loading">{LOADING_MESSAGES.DEMO}</div>}>
            <PerformanceExample />
          </Suspense>
        </section>
      </main>
      
      <Suspense fallback={<div className="loading">{LOADING_MESSAGES.FOOTER}</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default React.memo(App);
