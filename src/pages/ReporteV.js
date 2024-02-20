import React, { useState } from 'react'
import NavSide from '../components/NavSide'
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useBesitz } from '../Context/BesitzContext';

const ReporteV = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { authToken } = useBesitz();

  const besitzVe = authToken.Besitz.ventas;

  return (
    <>
      <NavSide isOpen={isSidebarOpen} toggleSidebar={toggle} />

      <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
        <Nav isOpen={isSidebarOpen} toggleSidebar={toggle} />
        <div className="contentT">
          <div className="dash">

            <div className="cardHeader">
              <h2>Dashboard Ventas</h2>
            </div>
            <div className="iframe-container">
              <iframe
                title="DASHBOARDWOK"
                className="dashp"
                src={besitzVe}
                frameBorder="0"
                allowFullScreen={true}
              ></iframe>
            </div>

          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default ReporteV
