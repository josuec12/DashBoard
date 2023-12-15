import React from 'react'
import { useAdmin } from '../Context/AdminContext'

const NavA = ({ toggleSidebar }) => {
    const { Admin } = useAdmin();

    if (!Admin) {
        console.log('no esta autenticado');
        return null;
    }

    const adminName = Admin.Admin.nom || 'Admin';

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
                    <h2 className="welcome">Welcome {adminName}</h2>
                </div>
                <div className="logoA">
                    <img src={require('../imagenes/logo.png')} alt="" />
                </div>
            </div>
        </nav>
    )
}

export default NavA
