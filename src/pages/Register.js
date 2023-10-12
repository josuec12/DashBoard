import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
      <div className="main">
          <div className="topbar">
              <div className="toggle">
                  <ion-icon name="menu-outline"></ion-icon>
              </div>
          </div>
          <div className="content" >
              <div className="card">
                  <h2>Registro</h2>
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
  )
}

export default Register