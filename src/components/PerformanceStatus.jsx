import React, { useState, useEffect } from 'react';
import usePerformanceMonitor from '@hooks/usePerformanceMonitor.js';

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

  return (
    <div style={{ 
      background: 'rgba(255, 255, 255, 0.1)', 
      padding: '1rem', 
      borderRadius: '8px',
      marginTop: '1rem'
    }}>
      <h4>🚀 Web Vitals Monitor (Live)</h4>
      {metricsArray.length === 0 ? (
        <p>Esperando métricas de rendimiento...</p>
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
                  backgroundColor: metric.rating === 'good' ? '#22c55e' : 
                                  metric.rating === 'needs-improvement' ? '#f59e0b' : '#ef4444',
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
