import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav';
import NavSideA from '../components/NavSideA';

const Register = ({isOpen, toggleSidebar}) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggle= () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
            <NavSideA isOpen={isSidebarOpen} toggleSidebar={toggle} />

      <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
      <Nav isOpen={isSidebarOpen} toggleSidebar={toggle}/>

          <div className="content" >
              <div className="dash">
              <div className="cardHeader">
                  <h2>Registro</h2>
                  </div>
                  <main className="ma">
                    <form action="#">
                        <div className="row">
                            <div className="col-6">
                            <div className="input-field">
                            <label for="name">Nombres</label>
                          <input type="text" className="input" id="name" required="" autocomplete="off" placeholder="Josue" />
                      </div>
                            </div>
                            <div className="col-6">
                            <div className="input-field">
                            <label for="name">Apellidos</label>
                          <input type="text" className="input" id="apeliido" required="" autocomplete="off" placeholder="Potter" />
                      </div> 
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                            <div className="input-field">
                            <label for="nit">Nit</label>
                          <input type="number" className="input" id="nit" required="" autocomplete="off" placeholder="965647482" />
                      </div>
                            </div>
                            <div className="col-6">
                      <div className="input-field">
                      <label for="pass">Contraseña</label>
                          <input type="password" className="input" id="pass" required="" placeholder="***********"></input>
                          
                      </div>
                      </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                            <div className="input-field">
                            <label for="ventas">Link Ventas</label>
                          <input type="url" className="input" id="ventas" required="" placeholder="https://www.example.com/"></input>
                          
                      </div>
                            </div>
                            <div className="col-6">
                            <div className="input-field">
                            <label for="financiero">Link Financiero</label>
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