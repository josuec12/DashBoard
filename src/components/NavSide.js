import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useBesitz } from '../Context/BesitzContext';

const NavSide = ({ isOpen}) => {
  const [activeLink, setActiveLink] = useState(null);
  const { logoutBesitz } = useBesitz(); 
  const navigate = useNavigate();

  const handleLinkMouseOver = (index) => {
    setActiveLink(index);
  };

  const handleLogout = () => {
    // Llama a la función correspondiente para cerrar sesión
    // Aquí se asume que hay una función de cierre de sesión en el contexto
    logoutBesitz();
    // Redirige a la página de inicio de sesión
    navigate('/');
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
      icon: <ion-icon name="log-out-outline"></ion-icon>,
      title: 'Cerrar sesion',
      onClick: {handleLogout},
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

export default NavSide;

