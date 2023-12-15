import React from 'react'
import { useBesitz } from '../Context/BesitzContext'


const Nav = ({ toggleSidebar }) => {

  const {Besitz} = useBesitz();
  if(!Besitz){
    console.log('No esta autenticado');
    return null;
  }

  const BesitzName = Besitz.Besitz.nombre || 'Cliente';
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sombra">
      <div className="container-fluid">
        <div className="toggle">
          <ion-icon onClick={toggleSidebar} name="menu-outline"></ion-icon>
        </div>
        <div>
          <h2 className="welcome">Welcome {BesitzName}</h2>
        </div>
        <div className="logo">
          <img src={require('../imagenes/descarga.png')} alt="" />
        </div>
      </div>
    </nav>

  )
}

export default Nav
