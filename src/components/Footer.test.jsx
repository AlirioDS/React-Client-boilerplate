import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Footer Component', () => {
  it('renders the footer with correct structure', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('App-footer');
  });

  it('displays copyright information', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
    expect(screen.getByText(/Todos los Derechos Reservados/i)).toBeInTheDocument();
  });

  it('shows React version information', () => {
    render(<Footer />);
    
    expect(screen.getByText(/Construido con React/i)).toBeInTheDocument();
    expect(screen.getByText(/⚛️/)).toBeInTheDocument();
  });

  it('has proper content structure', () => {
    render(<Footer />);
    
    const footerContent = document.querySelector('.footer-content');
    expect(footerContent).toBeInTheDocument();
  });

  it('renders without errors', () => {
    expect(() => render(<Footer />)).not.toThrow();
  });
}); 
