import React from 'react'

const Nav = ({ toggleSidebar }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sombra">
      <div className="container-fluid">
        <div className="toggle">
          <ion-icon onClick={toggleSidebar} name="menu-outline"></ion-icon>
        </div>
        <div>
          <h2 className="welcome">Bienvenido Josue</h2>
        </div>
        <div className="logo">
          <img src={require('../imagenes/descarga.png')} alt="" />
        </div>
      </div>
    </nav>

  )
}

export default Nav
