import React from 'react'

const Nav = ({ toggleSidebar }) => {
  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary sombra">
      <div className="container-fluid">
        <div className="toggle">
          <label className="buttonT" htmlFor="toggle">
            <input type="checkbox" id="toggle" onClick={toggleSidebar} />
            <span></span>
            <span></span>
            <span></span>
          </label>
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
