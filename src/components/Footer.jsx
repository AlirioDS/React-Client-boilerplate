import React from 'react';

const Footer = React.memo(() => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="App-footer">
      <div className="footer-content">
        <p className="footer-text">
          &copy; {currentYear} Todos los Derechos Reservados.
        </p>
        <p className="footer-tech">
          Construido con React {React.version} ⚛️
        </p>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer; 
