import React, { useState } from 'react'
import NavSideA from '../components/NavSideA';
import RegisterU from './RegisertU';
import RegisteA from './RegisteA';
import NavA from '../components/NavA';
import Footer from '../components/Footer';

const Register = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className='body'>
      <NavSideA isOpen={isSidebarOpen} toggleSidebar={toggle} />

      <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
        <NavA isOpen={isSidebarOpen} toggleSidebar={toggle} />

        <div className="content">
          <div className="dash">
            <div className="accordion shadow" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button bg-ligth" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <div className="cardHeader">
                      <h2>Registro Cliente</h2>
                    </div>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <RegisterU />
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button bg-ligth collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <div className="cardHeader">
                      <h2>Registro Administrador</h2>
                    </div>
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <RegisteA />
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Register