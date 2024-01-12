import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useBesitz } from '../Context/BesitzContext';

const NavSide = ({ isOpen}) => {
  const [activeLink, setActiveLink] = useState(null);
  const { logoutBesitz } = useBesitz(); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Obtener el estado activeLink de la URL cuando cambia la ubicación
    const queryParams = new URLSearchParams(location.search);
    const activeLinkFromUrl = queryParams.get('activeLink');

    // Actualizar el estado si el valor existe en la URL
    if (activeLinkFromUrl !== null) {
      setActiveLink(parseInt(activeLinkFromUrl, 10));
    } else {
      // Si no hay activeLink en la URL, establecer el botón "Home" como activo por defecto
      setActiveLink(0); // Cambia el índice según sea necesario
    }
  }, [location.search]);

  const handleLinkClick = (index) => {
    setActiveLink(index);
    if (links[index].onClick) {
      // No hagas nada adicional si es un enlace especial (por ejemplo, cerrar sesión)
      return;
    }
    navigate(`${links[index].to}?activeLink=${index}`);
  };

  const handleLogout = () => {
    logoutBesitz();
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
            <li key={index} onClick={() => handleLinkClick(index)} className={activeLink === index ? 'li hovered' : ''}>
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

