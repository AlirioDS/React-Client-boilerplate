import React, { useState } from 'react';
import { usePerformanceMonitor } from '@hooks';
import { LOADING_MESSAGES, RATING_COLORS } from '../constants';

/**
 * PerformanceStatus Component
 * 
 * Displays real-time Web Vitals performance metrics
 * Features:
 * - Real-time metric updates
 * - Color-coded performance ratings
 * - Deduplication to prevent infinite loops
 * 
 * @returns {JSX.Element} Performance monitoring display
 */
const PerformanceStatus = () => {
  const [metrics, setMetrics] = useState(new Map());

  // Monitor performance with our custom hook (without console logging)
  usePerformanceMonitor((metric) => {
    setMetrics(prev => {
      const newMetrics = new Map(prev);
      newMetrics.set(metric.name, {
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now()
      });
      return newMetrics;
    });
  });

  const metricsArray = Array.from(metrics.entries()).map(([name, data]) => ({
    name,
    ...data
  }));

  /**
   * Get background color for performance rating
   * @param {string} rating - Performance rating (good, needs-improvement, poor)
   * @returns {string} Color hex code
   */
  const getRatingColor = (rating) => RATING_COLORS[rating] || RATING_COLORS.poor;

  return (
    <div style={{ 
      background: 'rgba(255, 255, 255, 0.1)', 
      padding: '1rem', 
      borderRadius: '8px',
      marginTop: '1rem'
    }}>
      <h4>🚀 Web Vitals Monitor (Live)</h4>
      {metricsArray.length === 0 ? (
        <p>{LOADING_MESSAGES.METRICS}</p>
      ) : (
        <ul style={{ textAlign: 'left', fontSize: '0.9rem' }}>
          {metricsArray.map((metric) => (
            <li key={metric.name}>
              <strong>{metric.name}:</strong> {metric.value.toFixed(2)}ms
              {metric.rating && (
                <span style={{ 
                  marginLeft: '0.5rem',
                  padding: '0.2rem 0.4rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  backgroundColor: getRatingColor(metric.rating),
                  color: 'white'
                }}>
                  {metric.rating}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      <p style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '0.5rem' }}>
        ✅ Web Vitals 4.2.4 - Sin duplicaciones | Métricas únicas: {metricsArray.length}
      </p>
    </div>
  );
};

export default React.memo(PerformanceStatus); 
