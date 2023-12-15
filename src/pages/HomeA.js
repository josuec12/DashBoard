import React, { useState } from 'react'
import { useAdmin } from '../Context/AdminContext';
import { Navigate } from 'react-router-dom';
import NavSideA from '../components/NavSideA'
import NavA from '../components/NavA';
import Carrusel from '../components/Carrusel';

const HomeA = () => {

  const { Admin } = useAdmin();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   // Verifica si el administrador está autenticado
   if (!Admin) {
    // Si no está autenticado, redirige a la página de inicio de sesión
    return <Navigate to="/Login" />;
  }


  const toggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavSideA isOpen={isSidebarOpen} toggleSidebar={toggle} />
      <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
        <NavA isOpen={isSidebarOpen} toggleSidebar={toggle} />
        <div className="cardBox" >
          <div className="card1">
            <div className="cardHeader">
              <h2>Noticias</h2>
            </div>
          </div>
          
          <Carrusel /> 
          
        </div>

        <div className="cont">
          <div className="boletin">
<<<<<<< HEAD
            <div className="cardHeader">  
              <h2>Solicitudes</h2>
=======
            <div className="cardHeader">
              <h2>Boletín</h2>
>>>>>>> parent of 4e133e9 (Acutalizaciones)
            </div>
            <iframe title="Boletin" src="" className="cyb"></iframe>

          </div>

          <div className="calendario">
            <div className="cardHeader">
              <h2>Calendario</h2>
            </div>
<<<<<<< HEAD
            <iframe title="calendario" src="https://0f36559d0fbe4ea2a3dad140b07b02ba.elf.site" className="cyb"></iframe>
=======
            <iframe title="calendario" src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23005eff&ctz=America%2FBogota&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&src=YzIyZmY2YzU4MzEzMzk1NmE0MjBiY2JlNDk0Mjg4ZGNjNGE0YjIxZjk4MjhmNmE1NTM2M2E4YzIwYjkxMzFlMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%233F51B5" className="cyb" scrolling="no"></iframe>
>>>>>>> parent of 4e133e9 (Acutalizaciones)
          </div>

        </div>

      </div>
    </div>

  )
}

export default HomeA
