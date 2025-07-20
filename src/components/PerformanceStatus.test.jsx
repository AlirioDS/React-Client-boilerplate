import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import PerformanceStatus from './PerformanceStatus';

// Mock the performance hook with a simple implementation
vi.mock('@hooks/usePerformanceMonitor.js', () => ({
  default: vi.fn((callback) => {
    // Simulate some metrics being received
    if (callback) {
      setTimeout(() => {
        callback({ name: 'FCP', value: 1000, rating: 'good' });
        callback({ name: 'LCP', value: 2000, rating: 'needs-improvement' });
      }, 0);
    }
  })
}));

describe('PerformanceStatus Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the performance monitoring section', () => {
    render(<PerformanceStatus />);
    
    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
    expect(screen.getByText(/Web Vitals Monitor/i)).toBeInTheDocument();
  });

  it('displays initial waiting state', () => {
    render(<PerformanceStatus />);
    
    expect(screen.getByText(/Esperando métricas de rendimiento/i)).toBeInTheDocument();
  });

  it('shows metrics count', () => {
    render(<PerformanceStatus />);
    
    expect(screen.getByText(/Métricas únicas:/i)).toBeInTheDocument();
  });

  it('displays web vitals version info', () => {
    render(<PerformanceStatus />);
    
    expect(screen.getByText(/Web Vitals.*Sin duplicaciones/i)).toBeInTheDocument();
  });

  it('has proper component structure', () => {
    render(<PerformanceStatus />);
    
    const heading = screen.getByRole('heading', { level: 4 });
    expect(heading).toBeInTheDocument();
    
    const container = screen.getByText(/Web Vitals Monitor/i).closest('div');
    expect(container).toBeInTheDocument();
  });

  it('renders without errors', () => {
    expect(() => render(<PerformanceStatus />)).not.toThrow();
  });
}); 
