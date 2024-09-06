import React, { useState } from 'react';
import NavSideA from '../components/NavSideA';
import NavA from '../components/NavA';
import Footer from '../components/Footer';
import AsignarEve from '../components/AsignarEve';
import RegisEve from '../components/RegisEve';
import DeleteEve from '../components/DeleteEve';
import DesasignarEve from '../components/DesasignarEve';

const Ccalendario = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <>
      <NavSideA isOpen={isSidebarOpen} toggleSidebar={toggle} />
      <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
        <NavA isOpen={isSidebarOpen} toggleSidebar={toggle} />
        <div className="contentR">
          <div className="dash">
            <div className="accordion shadow" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button bg-ligth" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <div className="cardHeader">
                      <h2>Registrar Evento</h2>
                    </div>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <RegisEve/>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button bg-ligth collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <div className="cardHeader">
                      <h2>Asignar Evento</h2>
                    </div>
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <AsignarEve/>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button bg-ligth collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    <div className="cardHeader">
                      <h2>Eliminar Evento</h2>
                    </div>
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <DeleteEve/>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button bg-ligth collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    <div className="cardHeader">
                      <h2>Eliminar Asignación</h2>
                    </div>
                  </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <DesasignarEve/>
                  </div>
                </div>
              </div>              
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Ccalendario;
