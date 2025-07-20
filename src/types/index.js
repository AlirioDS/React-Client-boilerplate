/**
 * Type definitions using JSDoc for better IDE support and documentation
 * @fileoverview Common type definitions for the React 19 + Vite application
 */

/**
 * @typedef {Object} WebVitalMetric
 * @property {string} name - The name of the metric (CLS, FID, FCP, LCP, TTFB)
 * @property {number} value - The numeric value of the metric
 * @property {string} [rating] - Performance rating: 'good', 'needs-improvement', or 'poor'
 * @property {string} [id] - Unique identifier for this metric instance
 * @property {number} [timestamp] - Timestamp when the metric was recorded
 */

/**
 * @typedef {Object} PerformanceCallback
 * @property {function(WebVitalMetric): void} callback - Function to handle metric updates
 */

/**
 * @typedef {Object} LoadingState
 * @property {boolean} isPending - Whether a transition is pending
 * @property {string} message - Loading message to display
 */

/**
 * @typedef {Object} AppConstants
 * @property {string} NAME - Application name
 * @property {string} DESCRIPTION - Application description
 * @property {string} VERSION - Application version
 */

/**
 * @typedef {Object} RatingColors
 * @property {string} good - Color for good performance rating
 * @property {string} needs-improvement - Color for needs improvement rating
 * @property {string} poor - Color for poor performance rating
 */

// Export empty object to make this a module
export {}; 
