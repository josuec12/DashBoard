import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavSideA = ({ isOpen, toggleSidebar }) => {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkMouseOver  = (index) => {
    setActiveLink(index);
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
      title: 'Tabla',
    },
    {
      to: '/Register',
      icon: <ion-icon name="person-add-outline"></ion-icon>,
      title: 'Registrar',
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
  
export default NavSideA;
