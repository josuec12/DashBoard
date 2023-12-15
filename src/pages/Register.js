import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav';
import NavSideA from '../components/NavSideA';
<<<<<<< HEAD
import RegisterU from './RegisertU';
import RegisteA from './RegisteA';
=======
>>>>>>> parent of 4e133e9 (Acutalizaciones)

const Register = ({ isOpen, toggleSidebar }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div>
      <NavSideA isOpen={isSidebarOpen} toggleSidebar={toggle} />

      <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
        <Nav isOpen={isSidebarOpen} toggleSidebar={toggle} />

        <div className="content" >
          <div className="dash">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button bg-light text-black" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <div className="cardHeader">
                      <h2>Registro Cliente</h2>
                    </div>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <RegisterU/>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button bg-light text-black collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  <div className="cardHeader">
                      <h2>Registro Administrador</h2>
                    </div>
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <RegisteA/>
                  </div>
                </div>
<<<<<<< HEAD
              </div>
=======
                <div className="row">
                  <div className="col">
                    <div className="input-field">
                      <label htmlFor="email">Email</label>
                      <input type="email" className="input" id="email" required="" autoComplete="off" placeholder="name@example.com" />
                    </div>
                  </div>
                  <div className="col">
                    <div className="input-field">
                      <label htmlFor="boletin" className="custom-file-button">
                        Subir Boletín
                      </label>
                      <div className="aa">
                        {selectedFile ? 'Archivo seleccionado: ' + selectedFile : 'Ningún archivo seleccionado'}
                      </div>
                      <input type="file" id="boletin" className="custom-input-file" onChange={handleFileChange} />
                    </div>
                  </div>

                </div>
                <div className="row">
                  <div className="col">
                    <div className="input-field">
                      <label htmlFor="ventas">Link Ventas</label>
                      <input type="url" className="input" id="ventas" required="" placeholder="https://www.example.com/"></input>

                    </div>
                  </div>
                  <div className="col">
                    <div className="input-field">
                      <label htmlFor="financiero">Link Financiero</label>
                      <input type="url" className="input" id="financiero" required="" placeholder="https://www.example.com/"></input>
                    </div>
                  </div>
                </div>
                <div className="regis">
                  <Link type="submit" className="btn-regis">Registrar</Link>
                </div>
              </form>
            </main>
>>>>>>> parent of 4e133e9 (Acutalizaciones)
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Register