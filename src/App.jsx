import React, { Suspense, lazy } from 'react';
import './App.css';

// Lazy loading components for better performance
const Header = lazy(() => import('@components/Header.jsx'));
const Footer = lazy(() => import('@components/Footer.jsx'));
const PerformanceExample = lazy(() => import('@components/PerformanceExample.jsx'));
const PerformanceStatus = lazy(() => import('@components/PerformanceStatus.jsx'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div className="loading">Cargando header...</div>}>
        <Header />
      </Suspense>
      
      <main className="App-main">
        <section className="hero-section">
          <h1 className="App-title">
            Cliente Moderno React 19 + Vite
          </h1>
          <p className="App-description">
            Aplicación React 19 con Vite, las mejores prácticas de rendimiento,
            incluyendo lazy loading, useTransition, useDeferredValue y más.
          </p>
          
          <Suspense fallback={<div className="loading">Cargando monitor...</div>}>
            <PerformanceStatus />
          </Suspense>
        </section>

        <section className="demo-section">
          <Suspense fallback={<div className="loading">Cargando demo...</div>}>
            <PerformanceExample />
          </Suspense>
        </section>
      </main>
      
      <Suspense fallback={<div className="loading">Cargando footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default React.memo(App);
