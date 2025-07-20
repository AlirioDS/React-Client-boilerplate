import React from 'react';

const Header = React.memo(() => {
  return (
    <header className="App-header">
      <nav className="App-nav">
        <div className="nav-brand">
          <h2>React 19 App</h2>
        </div>
        <ul className="nav-links">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
});

Header.displayName = 'Header';

export default Header; 
