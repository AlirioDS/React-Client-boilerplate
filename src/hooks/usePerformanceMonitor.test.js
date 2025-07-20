import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock web-vitals module without variables
vi.mock('web-vitals', () => ({
  onCLS: vi.fn(),
  onFID: vi.fn(),
  onFCP: vi.fn(),
  onLCP: vi.fn(),
  onTTFB: vi.fn(),
}));

// Mock console methods
const mockConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

describe('usePerformanceMonitor Hook', () => {
  let usePerformanceMonitor;

  beforeEach(async () => {
    vi.clearAllMocks();
    mockConsoleWarn.mockClear();
    mockConsoleError.mockClear();
    
    // Mock development environment
    vi.stubGlobal('import.meta', {
      env: { DEV: true }
    });

    // Import the hook after mocking
    usePerformanceMonitor = (await import('./usePerformanceMonitor')).default;
  });

  it('can be rendered without errors', () => {
    expect(() => {
      renderHook(() => usePerformanceMonitor(() => {}));
    }).not.toThrow();
  });

  it('accepts a callback function', () => {
    const callback = vi.fn();
    
    expect(() => {
      renderHook(() => usePerformanceMonitor(callback));
    }).not.toThrow();
  });

  it('handles missing callback gracefully', () => {
    expect(() => {
      renderHook(() => usePerformanceMonitor());
    }).not.toThrow();
  });

  it('works with multiple instances', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    
    expect(() => {
      renderHook(() => usePerformanceMonitor(callback1));
      renderHook(() => usePerformanceMonitor(callback2));
    }).not.toThrow();
  });

  it('does not crash the application', () => {
    // This is the most important test - ensuring the hook is stable
    const { result, rerender } = renderHook(() => usePerformanceMonitor(() => {}));
    
    // Multiple re-renders should not cause issues
    rerender();
    rerender();
    
    expect(result.error).toBeUndefined();
  });
}); 
