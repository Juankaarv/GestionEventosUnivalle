import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './Header.css';

const Header = () => {
  // Recuperar el rol del usuario de sessionStorage o localStorage
  const userRole = sessionStorage.getItem('rol'); // Cambiar a localStorage si es necesario

  return (
    <nav className="navbar navbar-expand-lg custom-bg">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          Uticket.
        </Link>

        {/* Botón de colapso en pantallas pequeñas */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del menú */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>

            {/* Mostrar elementos adicionales si el rol NO es "2" */}
            {userRole !== '2' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/ActiveEvents">
                    Eventos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Reservas">
                    Informe Reservas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/zonasList">
                    Zonas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Usuarios">
                    Usuarios
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/QrValidatorPage">
                    Validar qr
                  </Link>
                </li>
              </>
            )}

            {/* Siempre mostrar Login */}
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
