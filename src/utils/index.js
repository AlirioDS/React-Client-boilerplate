/**
 * Utility Functions
 * Common helper functions used across the application
 */

/**
 * Formats a performance metric value for display
 * @param {number} value - The metric value
 * @param {string} unit - The unit to append (default: 'ms')
 * @returns {string} Formatted value with unit
 */
export const formatMetricValue = (value, unit = 'ms') => {
  if (typeof value !== 'number') return 'N/A';
  return `${value.toFixed(2)}${unit}`;
};

/**
 * Debounces a function call
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Checks if the current environment is development
 * @returns {boolean} True if in development mode
 */
export const isDev = () => import.meta.env.DEV;

/**
 * Checks if the current environment is production
 * @returns {boolean} True if in production mode
 */
export const isProd = () => import.meta.env.PROD;

/**
 * Gets a nested property from an object safely
 * @param {Object} obj - Object to search in
 * @param {string} path - Dot-separated path to the property
 * @param {*} defaultValue - Default value if property not found
 * @returns {*} The property value or default value
 */
export const getNestedProperty = (obj, path, defaultValue = undefined) => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : defaultValue;
  }, obj);
};

/**
 * Generates a unique ID
 * @returns {string} Unique identifier
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}; 
