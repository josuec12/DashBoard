import React, { useState, useEffect } from 'react';
import NavSideA from '../components/NavSideA';
import NavA from '../components/NavA';
import Footer from '../components/Footer';
import Carrusel from '../components/Carrusel';
import axios from 'axios';
import CalendarioA from '../components/CalendarioA';

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
        const response = await axios.get('http://localhost:5000/Passwords');
        const newSolicitudes = response.data.docs || [];
        
        // Comprobar si hay nuevas solicitudes
        if (JSON.stringify(newSolicitudes) !== JSON.stringify(solicitudes)) {
          setSolicitudes(newSolicitudes);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
        setLoading(false);
      }
    };
  
    // Realizar la primera solicitud al montar el componente
    fetchSolicitudes();
  
    // Establecer el intervalo para realizar la consulta cada cierto tiempo
    const intervalId = setInterval(fetchSolicitudes, 5000); // Consultar cada 5 segundos
  
    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, [solicitudes]); // Dependencia de efecto para que se ejecute cuando cambian las solicitudes existentes
  

  const handleSolicitud = async (solicitudId) => {
    try { 
      await axios.delete(`http://localhost:5000/Passwords/${solicitudId}`);

      setSolicitudes(prevSolicitudes => prevSolicitudes.filter(solicitud => solicitud._id !== solicitudId));
    } catch (error) {
      console.error('Error al aprobar la solicitud:', error);
    }
  };

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
            ) : solicitudes.length === 0 ? (
                <div className="contentP">
                  <div className="textP">NINGUNA SOLICITUD...</div>
                  <div className="textP">NINGUNA SOLICITUD...</div>
                </div>) : (
              <ul className='list'>
                {solicitudes.map((solicitud) => (
                  <li className='cardE shadow text-capitalize' key={solicitud._id}>
                    {solicitud.name} {solicitud.lastName}
                    <button className="buttonAp" onClick={() => handleSolicitud(solicitud._id)}>
                      <p className="submitAp"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><polyline fill='none' points="20 6 9 17 4 12"></polyline></svg></p>
                    </button>  
                    <button className="buttonRe" onClick={() => handleSolicitud(solicitud._id)}>
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
              <CalendarioA/>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default HomeA;
