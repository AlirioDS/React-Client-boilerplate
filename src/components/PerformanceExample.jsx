import React, { useState, useMemo, useCallback, useTransition, useDeferredValue } from 'react';

// Example component demonstrating React 19 performance features
const PerformanceExample = React.memo(() => {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  
  // Simulated expensive computation
  const filteredResults = useMemo(() => {
    const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1} - ${deferredQuery}`);
    return items.filter(item => 
      item.toLowerCase().includes(deferredQuery.toLowerCase())
    ).slice(0, 100); // Show only first 100 results
  }, [deferredQuery]);

  // Optimized event handler with useCallback
  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    startTransition(() => {
      setQuery(value);
    });
  }, []);

  return (
    <div className="performance-example">
      <h3>React 19 Performance Demo</h3>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar elementos..."
          onChange={handleInputChange}
          className="search-input"
        />
        {isPending && <span className="loading-indicator">🔄 Buscando...</span>}
      </div>
      
      <div className="results-container">
        <p>Mostrando {filteredResults.length} resultados para: &quot;{deferredQuery}&quot;</p>
        <ul className="results-list">
          {filteredResults.map((item, index) => (
            <li key={index} className="result-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

PerformanceExample.displayName = 'PerformanceExample';

export default PerformanceExample; 
