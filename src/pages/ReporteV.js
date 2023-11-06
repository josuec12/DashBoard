import React, { useState } from 'react'
import NavSide from '../components/NavSide'
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const ReporteV = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavSide isOpen={isSidebarOpen} toggleSidebar={toggle} />

      <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
        <Nav isOpen={isSidebarOpen} toggleSidebar={toggle} />
        <div className="content">
          <div className="dash">
            
              <div className="cardHeader">
                <h2>Dashboard Ventas</h2>
              </div>
              <div className="iframe-container">
              <iframe
                title="DASHBOARDWOK"
                className="dashp"
                src="https://app.powerbi.com/view?r=eyJrIjoiNmVkM2UzMDktNzMxYS00YjM4LWEzMTUtNjI1MzM0YjJjOTFmIiwidCI6IjhhNmUyOWJiLWRmNDYtNGMxOS04NWJkLTZmNTVjYmNhNzEyNCIsImMiOjR9"
                frameBorder="0"
                allowFullScreen={true}
              ></iframe>
            </div>
            
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default ReporteV
