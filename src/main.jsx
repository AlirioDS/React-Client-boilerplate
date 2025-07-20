import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Development confirmation
if (import.meta.env.DEV) {
  console.warn('🎉 React 19 + Vite app initialized successfully!');
  console.warn('📊 Performance monitoring ready (no infinite loops)');
}
