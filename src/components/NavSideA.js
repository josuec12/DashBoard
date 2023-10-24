import React from 'react'
import { NavLink } from 'react-router-dom'

const NavSideA = ({isNavigation}) => {
  return (
    <div className={`${!isNavigation ? "close" : ""}`}>
    <div className="navigation">
        <ul>
          <li>
            <NavLink to="/HomeA">
              <span className="icon">
              <ion-ico><img className="img" src={require('../imagenes/blancol.png')} /></ion-ico> 
              </span>
              <h3 className="tittle2">Besitz</h3>
            </NavLink>   
          </li>

          <li>
            <NavLink to="/HomeA">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Home</span>
            </NavLink>
          </li>

           <li>
            <NavLink to="/Tabla">
              <span className="icon">
              <ion-icon name="tablet-landscape-outline"></ion-icon>
              </span>
              <span className="title">Tabla</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/Register">
              <span className="icon">
              <ion-icon name="person-add-outline"></ion-icon>
              </span>
              <span className="title">Registrar</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/">
              <span className="icon">
                <ion-icon name="log-out-outline"></ion-icon>
              </span>
              <span className="title">Cerrar sesion</span>
            </NavLink>
          </li>
        </ul>
</div>
      </div>
  )
}

export default NavSideA
