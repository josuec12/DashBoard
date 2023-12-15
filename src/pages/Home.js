import React, { useState } from 'react'
import NavSide from '../components/NavSide';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Carrusel from '../components/Carrusel';
import { useBesitz } from '../Context/BesitzContext';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const {Besitz} = useBesitz();

  if(!Besitz){
    console.log('No esta autenticado')
    return null;
  }

  const besitzBol = Besitz.Besitz.boletin;

  return (
    <div>
      <NavSide isOpen={isSidebarOpen} toggleSidebar={toggle} />
      <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
        <Nav isOpen={isSidebarOpen} toggleSidebar={toggle} />
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
              <h2>Boletín</h2>
            </div>
            <iframe title="Boletin" src={`http://localhost:5000/${besitzBol}`}className="cyb"></iframe>
          </div>
          <div className="calendario">
            <div className="cardHeader">
              <h2>Calendario</h2>
            </div>
            <iframe title="calendario" src="https://0f36559d0fbe4ea2a3dad140b07b02ba.elf.site" className="cyb" scrolling="no"></iframe>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
