import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavSide = ({ isOpen}) => {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkMouseOver = (index) => {
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
            <NavLink to="/Home">
              <span className="icon">
                <ion-ico>
                  <img className="img" src={require('../imagenes/blancol.png')} alt="" />
                </ion-ico>
              </span>
              <h3 className="tittle2">Besitz</h3>
            </NavLink>
          </li>

          {links.map((link, index) => (
            <li key={index} onMouseOver={() => handleLinkMouseOver(index)} className={activeLink === index ? 'hovered' : ''}>
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

