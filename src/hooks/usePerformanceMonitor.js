import { useEffect, useCallback, useRef } from 'react';
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';
import { isDevelopment } from '../constants';

// Singleton pattern to prevent multiple listeners
let listenersRegistered = false;
const performanceCallbacks = new Set();

/**
 * Register web-vitals listeners only once across the entire application
 * Uses singleton pattern to prevent multiple registrations
 */
const registerWebVitalsListeners = () => {
  if (listenersRegistered) return;
  
  /**
   * Report a web vital metric to all registered callbacks
   * @param {Object} metric - Web vital metric object
   * @param {string} metric.name - Metric name (CLS, FID, FCP, LCP, TTFB)
   * @param {number} metric.value - Metric value
   * @param {string} [metric.rating] - Performance rating
   */
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
  
  if (isDevelopment) {
    console.warn('🚀 Web Vitals listeners registered once');
  }
};

/**
 * Custom hook for monitoring Web Vitals performance metrics
 * 
 * Features:
 * - Singleton pattern to prevent multiple listener registrations
 * - Automatic cleanup on component unmount
 * - Support for multiple components using the same hook
 * - Development logging for debugging
 * 
 * @param {Function} callback - Function to call when a metric is received
 * @param {Object} callback.metric - Web vital metric object
 * @param {string} callback.metric.name - Metric name
 * @param {number} callback.metric.value - Metric value
 * @param {string} [callback.metric.rating] - Performance rating
 * 
 * @example
 * ```jsx
 * function MyComponent() {
 *   usePerformanceMonitor((metric) => {
 *     console.log(`${metric.name}: ${metric.value}`);
 *   });
 *   return <div>Component with performance monitoring</div>;
 * }
 * ```
 */
const usePerformanceMonitor = (callback) => {
  const registeredRef = useRef(false);

  // Memoize the callback to prevent infinite re-registrations
  const memoizedCallback = useCallback((metric) => {
    if (!callback || typeof callback !== 'function') return;
    
    // Prevent duplicate metric reports for the same metric type
    if (registeredRef.current) {
      callback(metric);
    }
    
    // Log to console in development (only once per metric)
    if (isDevelopment) {
      console.warn(`${metric.name}: ${metric.value}${metric.rating ? ` (${metric.rating})` : ''}`);
    }
  }, [callback]);

  useEffect(() => {
    // Prevent registering the same callback multiple times
    if (registeredRef.current) return;
    
    // Register this component's callback
    if (memoizedCallback) {
      performanceCallbacks.add(memoizedCallback);
    }
    
    // Register global listeners (singleton)
    registerWebVitalsListeners();
    
    registeredRef.current = true;

    // Cleanup: remove this component's callback when unmounting
    return () => {
      if (memoizedCallback) {
        performanceCallbacks.delete(memoizedCallback);
      }
      registeredRef.current = false;
    };
  }, [memoizedCallback]);
};

export default usePerformanceMonitor; 
