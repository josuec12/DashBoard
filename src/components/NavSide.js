import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const NavSide = () => { 
  return (
      <div className="navigation">
        <ul>
          <li>
            <NavLink to="/Home">
              <span className="icon">
                <ion-ico><img className="img" src={require('../imagenes/blancol.png')} /></ion-ico> 
              </span>
              <h3 className="tittle2">Besitz</h3>
            </NavLink>
          </li>

          <li>
            <NavLink to="/Home">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Home</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/ReporteV">
              <span className="icon">
                <ion-icon name="bar-chart-outline"></ion-icon>
              </span>
              <span className="title">Reporte Ventas</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/ReporteF">
              <span className="icon">
                <ion-icon name="bar-chart-outline"></ion-icon>
              </span>
              <span className="title">Reporte Financiero</span>
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
            <NavLink to="/Login">
              <span className="icon">
                <ion-icon name="log-out-outline"></ion-icon>
              </span>
              <span className="title">Cerrar sesion</span>
            </NavLink>
          </li>
        </ul>

      </div>


  )
}

export default NavSide

let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));
