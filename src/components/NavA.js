import React from 'react'

const NavA = ({ toggleSidebar }) => {
  return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary sombra">
          <div className="container-fluid">
              <div className="toggle">
                  <ion-icon onClick={toggleSidebar} name="menu-outline"></ion-icon>
              </div>
              <div>
                <h2 className="welcome">Bienvenido Admin</h2>
              </div>
              <div className="logoA">
                  <img src={require('../imagenes/logo.png')} alt="" />
              </div>
          </div>
      </nav>
  )
}

export default NavA
