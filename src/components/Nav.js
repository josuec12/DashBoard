import React from 'react'
import { useBesitz } from '../Context/BesitzContext'


const Nav = ({ toggleSidebar }) => {

  const { authToken } = useBesitz();
  if (!authToken) {
    return null;
  }

  const BesitzName = authToken.Besitz.nombre || 'Cliente';
  const Besitzlogo = authToken.Besitz.logo;
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sombra">
      <div className="container-fluid">
        <div className="toggle" >
          <label className="buttonT" htmlFor="toggle">
            <input type="checkbox" id="toggle" onClick={toggleSidebar} />
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <div>
          <h2 className="welcome">Welcome {BesitzName}</h2>
        </div>
        <div className="logo">
          <img src={Besitzlogo} alt="" />
        </div>
      </div>
    </nav>

  )
}

export default Nav
