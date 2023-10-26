import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavSide from '../components/NavSide';
import Nav from '../components/Nav';

const ReporteF = ({isOpen, toggleSidebar}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggle= () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
  <div>
    <NavSide isOpen={isSidebarOpen} toggleSidebar={toggle}/>
   <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
   <Nav isOpen={isSidebarOpen} toggleSidebar={toggle}/>
      <div className="content" >
        <div className="dash">
        <div className="cardHeader">
          <h2>Dashboard Financiero</h2>
          </div>
          <main>
          <iframe title="DASHBOARDWOK" width="1100" height="646" src="https://app.powerbi.com/view?r=eyJrIjoiNmVkM2UzMDktNzMxYS00YjM4LWEzMTUtNjI1MzM0YjJjOTFmIiwidCI6IjhhNmUyOWJiLWRmNDYtNGMxOS04NWJkLTZmNTVjYmNhNzEyNCIsImMiOjR9" frameborder="0" allowFullScreen="true"></iframe>
          </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright &copy; Besitz 2023</div>
                <div>
                  <Link to="#">Privacy Policy</Link>
                  &middot;
                  <Link to="#">Terms &amp; Conditions</Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ReporteF
