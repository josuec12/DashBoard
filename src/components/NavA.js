import React from 'react'

const NavA = ({ toggleSidebar }) => {
    return (
        <nav className="navbar navbar-expand-md bg-body-tertiary sombra">
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
