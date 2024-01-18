import React, { useState } from 'react'
import { useAdmin } from '../Context/AdminContext';
import { Navigate } from 'react-router-dom';
import NavSideA from '../components/NavSideA'
import NavA from '../components/NavA';
import Carrusel from '../components/Carrusel';
import CarruselV from '../components/CarruselV';

const HomeA = () => {

  const { authAdmin } = useAdmin();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   // Verifica si el administrador está autenticado
   if (!authAdmin) {
    // Si no está autenticado, redirige a la página de inicio de sesión
    return <Navigate to="/Login" />;
  }


  const toggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <NavSideA isOpen={isSidebarOpen} toggleSidebar={toggle} />
      <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
        <NavA isOpen={isSidebarOpen} toggleSidebar={toggle} />
        <div className="cardBox" >
          <div className="card1">
            <div className="cardHeader">
              <h2>Noticias</h2>
            </div>
          </div>   
          <Carrusel/>   
        </div>
        <div className="cont">
          <div className="boletin">
            <div className="cardHeader">  
              <h2>Solicitudes</h2>
          </div>  
          {/* <CarruselV/>   */}
        </div>
        <div className="calendario">
            <div className="cardHeader">
              <h2>Calendario</h2>
            </div>
            <iframe title="calendario" src="https://0f36559d0fbe4ea2a3dad140b07b02ba.elf.site" className="cyb"></iframe>
          </div>
      </div>
    </div>
    </>

  )
}

export default HomeA
