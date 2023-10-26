import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavSide = ({ isOpen, toggleSidebar }) => {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const links = [
    {
      to: '/Home',
      icon: <ion-icon name="home-outline"></ion-icon>,
      title: 'Home',
    },
    {
      to: '/ReporteV',
      icon: <ion-icon name="bar-chart-outline"></ion-icon>,
      title: 'Reporte Ventas',
    },
    {
      to: '/ReporteF',
      icon: <ion-icon name="bar-chart-outline"></ion-icon>,
      title: 'Reporte Financiero',
    },
    {
      to: '/',
      icon: <ion-icon name="log-out-outline"></ion-icon>,
      title: 'Cerrar sesion',
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
                  <img className="img" src={require('../imagenes/blancol.png')} />
                </ion-ico>
              </span>
              <h3 className="tittle2">Besitz</h3>
            </NavLink>
          </li>

          {links.map((link, index) => (
            <li key={index} onClick={() => handleLinkClick(index)} className={activeLink === index ? 'hovered' : ''}>
              <NavLink to={link.to}>
                <span className="icon">{link.icon}</span>
                <span className="title">{link.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavSide;

