import { describe, it, expect, vi } from 'vitest';
import { 
  formatMetricValue, 
  debounce, 
  getNestedProperty, 
  generateId 
} from './index.js';

describe('Utility Functions', () => {
  describe('formatMetricValue', () => {
    it('formats numeric values correctly', () => {
      expect(formatMetricValue(123.456)).toBe('123.46ms');
      expect(formatMetricValue(100, 's')).toBe('100.00s');
      expect(formatMetricValue(0)).toBe('0.00ms');
    });

    it('handles invalid values', () => {
      expect(formatMetricValue(null)).toBe('N/A');
      expect(formatMetricValue(undefined)).toBe('N/A');
      expect(formatMetricValue('invalid')).toBe('N/A');
    });
  });

  describe('debounce', () => {
    it('debounces function calls', async () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('arg1');
      debouncedFn('arg2');
      debouncedFn('arg3');

      expect(mockFn).not.toHaveBeenCalled();

      await new Promise(resolve => setTimeout(resolve, 150));
      
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('arg3');
    });
  });

  describe('getNestedProperty', () => {
    const testObj = {
      level1: {
        level2: {
          value: 'found'
        },
        nullValue: null
      }
    };

    it('gets nested properties correctly', () => {
      expect(getNestedProperty(testObj, 'level1.level2.value')).toBe('found');
      expect(getNestedProperty(testObj, 'level1.level2')).toEqual({ value: 'found' });
    });

    it('returns default value for missing properties', () => {
      expect(getNestedProperty(testObj, 'missing.path', 'default')).toBe('default');
      expect(getNestedProperty(testObj, 'level1.missing', 'default')).toBe('default');
    });

    it('handles null and undefined correctly', () => {
      expect(getNestedProperty(testObj, 'level1.nullValue')).toBe(null);
      expect(getNestedProperty(null, 'any.path', 'default')).toBe('default');
    });
  });

  describe('generateId', () => {
    it('generates unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
      expect(id1.length).toBeGreaterThan(10);
    });
  });
}); 
