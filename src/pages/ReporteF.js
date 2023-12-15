import React, { useState } from 'react'
import NavSide from '../components/NavSide';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useBesitz } from '../Context/BesitzContext';

const ReporteF = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const {Besitz} = useBesitz();

  if(!Besitz){
    console.log('No esta autenticado')
    return null;
  }

  const besitzFi = Besitz.Besitz.financiero;

  return (
    <div>
      <NavSide isOpen={isSidebarOpen} toggleSidebar={toggle} />
      <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
        <Nav isOpen={isSidebarOpen} toggleSidebar={toggle} />
        <div className="content" >
          <div className="dash">
            <div className="cardHeader">
              <h2>Dashboard Financiero</h2>
            </div>
            <div className="iframe-container">
              <iframe 
              title="DASHBOARDWOK" 
              className="dashp" 
              src={besitzFi} 
              frameBorder="0" 
              allowFullScreen={true}>
              </iframe>
              </div> 
          </div>          
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default ReporteF
