import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdmin } from '../Context/AdminContext.js';

const NavSideA = ({ isOpen }) => {
  const [activeLink, setActiveLink] = useState(null);
  const { logoutAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleLinkMouseOver = (index) => {
    setActiveLink(index);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    logoutAdmin();
    // Redirige a la página de inicio de sesión
    navigate('/');
  };

  const links = [
    {
      to: '/HomeA',
      icon: <ion-icon name="home-outline"></ion-icon>,
      title: 'Home',
    },
    {
      to: '/Tabla',
      icon: <ion-icon name="tablet-landscape-outline"></ion-icon>,
      title: 'Registros C',
    },
    {
      to: '/TablaA',
      icon: <ion-icon name="tablet-landscape-outline"></ion-icon>,
      title: 'Registros A',
    },
    {
      to: '/Register',
      icon: <ion-icon name="person-add-outline"></ion-icon>,
      title: 'Registrar',
    },
    {
      icon: <ion-icon name="log-out-outline"></ion-icon>,
      title: 'Cerrar sesion',
      onClick: { handleLogout },
    },
  ];

  return (
    <div className={`navigation ${isOpen ? 'active' : ''}`}>
      <div>
        <ul>
          <li>
            <NavLink to="/HomeA">
              <span className="icon">
                <ion-ico>
                  <img className="img" src={require('../imagenes/LogoSL.png')} alt="" />
                </ion-ico>
              </span>
              <h3 className="tittle2">Besitz</h3>
            </NavLink>
          </li>

          {links.map((link, index) => (
            <li key={index} onMouseOver={() => handleLinkMouseOver(index)} className={activeLink === index ? 'hovered' : ''}>
              {link.onClick ? (
                <NavLink onClick={handleLogout}>
                  <span className="icon">{link.icon}</span>
                  <span className="title">{link.title}</span>
                </NavLink>
              ) : (
                <NavLink to={link.to}>
                  <span className="icon">{link.icon}</span>
                  <span className="title">{link.title}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavSideA;
