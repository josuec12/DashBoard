import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav';
import NavSideA from '../components/NavSideA';

const Register = ({ isOpen, toggleSidebar }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
    } else {
      setSelectedFile(null);
    }
  };

  return (
    <div>
      <NavSideA isOpen={isSidebarOpen} toggleSidebar={toggle} />

      <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
        <Nav isOpen={isSidebarOpen} toggleSidebar={toggle} />

        <div className="content" >
          <div className="dash">
            <div className="cardHeader">
              <h2>Registro</h2>
            </div>
            <main>
              <form action="#">
                <div className="row">
                  <div className="col">
                    <div className="input-field">
                      <label htmlFor="name">Nombres</label>
                      <input type="text" className="input" id="name" required="" autoComplete="off" placeholder="Josue" />
                    </div>
                  </div>
                  <div className="col">
                    <div className="input-field">
                      <label htmlFor="apellido">Apellidos</label>
                      <input type="text" className="input" id="apellido" required="" autoComplete="off" placeholder="Potter" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="input-field">
                      <label htmlFor="nit">Nit</label>
                      <input type="number" className="input" id="nit" required="" autoComplete="off" placeholder="965647482" />
                    </div>
                  </div>
                  <div className="col">
                    <div className="input-field">
                      <label htmlFor="pass">Contraseña</label>
                      <input type="password" className="input" id="pass" required="" placeholder="***********"></input>
                    </div>
                  </div>
                </div>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register