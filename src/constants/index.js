/**
 * Application Constants
 * Centralized place for all application constants
 */

// Loading Messages
export const LOADING_MESSAGES = {
  HEADER: 'Cargando header...',
  FOOTER: 'Cargando footer...',
  MONITOR: 'Cargando monitor...',
  DEMO: 'Cargando demo...',
  METRICS: 'Esperando métricas de rendimiento...',
};

// Performance Metrics
export const PERFORMANCE_METRICS = {
  CLS: 'Cumulative Layout Shift',
  FID: 'First Input Delay', 
  FCP: 'First Contentful Paint',
  LCP: 'Largest Contentful Paint',
  TTFB: 'Time to First Byte',
};

// Rating Thresholds
export const RATING_COLORS = {
  good: '#22c55e',
  'needs-improvement': '#f59e0b',
  poor: '#ef4444',
};

// App Info
export const APP_INFO = {
  NAME: 'Cliente Moderno React 19 + Vite',
  DESCRIPTION: 'Aplicación React 19 con Vite, las mejores prácticas de rendimiento, incluyendo lazy loading, useTransition, useDeferredValue y más.',
  VERSION: '2.0.0',
};

// Environment
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD; 
