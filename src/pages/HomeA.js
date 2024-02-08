import React, { useState, useEffect } from 'react';
import NavSideA from '../components/NavSideA';
import NavA from '../components/NavA';
import Footer from '../components/Footer';
import Carrusel from '../components/Carrusel'
import axios from 'axios';

const HomeA = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/solicitudes');
        const newSolicitudes = response.data.docs || [];
        setSolicitudes(newSolicitudes);
        setLoading(false);
        console.log('data', response);
      } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, []); // <-- Llamada incondicional de useEffect, no depende de ninguna variable de estado

  return (
    <>
      <NavSideA isOpen={isSidebarOpen} toggleSidebar={toggle} />
      <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
        <NavA isOpen={isSidebarOpen} toggleSidebar={toggle} />
        <div className="cardBox">
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
              <h2>Recovery pass</h2>
            </div>
            {loading ? (
              <p>Cargando solicitudes...</p>
            ) : (
              <ul className='list'>
                {solicitudes.map((solicitud) => (
                  <li className='cardE shadow' key={solicitud._id}>
                    {solicitud.email}
                    <button className="buttonAp">
                      <p className="submitAp"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><polyline fill='none' points="20 6 9 17 4 12"></polyline></svg></p>
                    </button>  
                    <button className="buttonRe">
                      <p className="submitRe"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></p>
                    </button>                
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="calendario">
            <div className="cardHeader">
              <h2>Calendario</h2>
            </div>
            <iframe
              title="calendario"
              src="https://0f36559d0fbe4ea2a3dad140b07b02ba.elf.site"
              className="cyb"
            ></iframe>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default HomeA;