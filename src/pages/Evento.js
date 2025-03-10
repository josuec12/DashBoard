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

  // Función para alternar la apertura/cierre del sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Datos de los acordeones para evitar repetir código
  const accordionItems = [
    {
      id: 'collapseOne',
      title: 'Registrar Evento',
      component: <RegisEve />,
    },
    {
      id: 'collapseTwo',
      title: 'Asignar Evento',
      component: <AsignarEve />,
    },
    {
      id: 'collapseThree',
      title: 'Eliminar Evento',
      component: <DeleteEve />,
    },
    {
      id: 'collapseFour',
      title: 'Eliminar Asignación',
      component: <DesasignarEve />,
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <NavSideA isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Contenido principal */}
      <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
        {/* Barra de navegación superior */}
        <NavA isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Contenido de la página */}
        <div className="contentR">
          <div className="dash">
            <div className="accordion shadow" id="accordionExample">
              {accordionItems.map((item, index) => (
                <div className="accordion-item" key={item.id}>
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button bg-light ${
                        index === 0 ? '' : 'collapsed'
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${item.id}`}
                      aria-expanded={index === 0 ? 'true' : 'false'}
                      aria-controls={item.id}
                    >
                      <div className="cardHeader">
                        <h2>{item.title}</h2>
                      </div>
                    </button>
                  </h2>
                  <div
                    id={item.id}
                    className={`accordion-collapse collapse ${
                      index === 0 ? 'show' : ''
                    }`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">{item.component}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Ccalendario;