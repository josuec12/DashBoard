import React, { useState } from 'react'
import NavA from '../components/NavA';
import NavSideA from '../components/NavSideA';
import Footer from '../components/Footer';

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
        <NavA isOpen={isSidebarOpen} toggleSidebar={toggle} />

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
                      <svg className="svg-icon1" width="24" viewBox="0 0 24 24" height="24" fill="none"><g stroke-width="2" stroke-linecap="round" stroke="#056dfa" fill-rule="evenodd" clip-rule="evenodd"><path d="m3 7h17c.5523 0 1 .44772 1 1v11c0 .5523-.4477 1-1 1h-16c-.55228 0-1-.4477-1-1z"></path><path d="m3 4.5c0-.27614.22386-.5.5-.5h6.29289c.13261 0 .25981.05268.35351.14645l2.8536 2.85355h-10z"></path></g></svg>
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
                <div className="btn-regis">
                <button className="CartBtn" type="submit">
                    <span className="IconContainer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16" id="IconChangeColor" transform="scale(-1, 1)">
                       <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" id="mainIconPathAttribute" fill="#ffffff"></path> 
                       <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" id="mainIconPathAttribute" fill="#ffffff"></path>
                       </svg>
                    </span>
                    <p className="textoo">Registrar</p>
                  </button>   
                </div>
              </form>
            </main>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default Register