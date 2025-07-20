import { useEffect, useCallback, useRef } from 'react';
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

// Singleton pattern to prevent multiple listeners
let listenersRegistered = false;
const performanceCallbacks = new Set();

// Register web-vitals listeners only once
const registerWebVitalsListeners = () => {
  if (listenersRegistered) return;
  
  const reportWebVital = (metric) => {
    // Call all registered callbacks
    performanceCallbacks.forEach(callback => {
      try {
        callback(metric);
      } catch (error) {
        console.error('Error in performance callback:', error);
      }
    });
  };

  // Register listeners only once
  onCLS(reportWebVital);
  onFID(reportWebVital);
  onFCP(reportWebVital);
  onLCP(reportWebVital);
  onTTFB(reportWebVital);
  
  listenersRegistered = true;
  
  if (import.meta.env.DEV) {
    console.warn('🚀 Web Vitals listeners registered once');
  }
};

export const usePerformanceMonitor = (onPerfEntry) => {
  const callbackRef = useRef(onPerfEntry);
  const registeredRef = useRef(false);

  // Update callback ref when it changes
  useEffect(() => {
    callbackRef.current = onPerfEntry;
  }, [onPerfEntry]);

  // Create a stable callback function
  const stableCallback = useCallback((metric) => {
    if (callbackRef.current && typeof callbackRef.current === 'function') {
      callbackRef.current(metric);
    }
    
    // Log to console in development (only once per metric)
    if (import.meta.env.DEV) {
      console.warn(`${metric.name}: ${metric.value}${metric.rating ? ` (${metric.rating})` : ''}`);
    }
  }, []);

  useEffect(() => {
    // Prevent registering the same callback multiple times
    if (registeredRef.current) return;
    
    // Add callback to the set
    performanceCallbacks.add(stableCallback);
    registeredRef.current = true;
    
    // Register web-vitals listeners (only happens once globally)
    registerWebVitalsListeners();

    // Cleanup function
    return () => {
      performanceCallbacks.delete(stableCallback);
      registeredRef.current = false;
    };
  }, [stableCallback]);
};

export default usePerformanceMonitor; 
