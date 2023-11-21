import React, { useState } from 'react'
import NavSideA from '../components/NavSideA'
import NavA from '../components/NavA';
import Carrusel from '../components/Carrusel';
import Footer from '../components/Footer';
import CarruselV from '../components/CarruselV';

const HomeA = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
            <div className="cardHeader">  
              <h2>...</h2>
            </div>
            <div className='cyb'><CarruselV/></div>
          </div>

          <div className="calendario">
            <div className="cardHeader">
              <h2>Calendario</h2>
            </div>
            <iframe title="calendario" src="https://widget-0f36559d0fbe4ea2a3dad140b07b02ba.elfsig.ht" className="cyb"></iframe>
          </div>

        </div>
        <Footer/>
      </div>
    </div>

  )
}

export default HomeA
