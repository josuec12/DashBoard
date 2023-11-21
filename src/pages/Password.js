import React from 'react'
import { Link } from 'react-router-dom'

const Password = () => {
  return (
      <div>
          <div className="wrapper">
          <img className="img-login scale-up-center" alt="logo" src={require('../imagenes/blanco.png')} />    
              <div className="container">          
                  <div className="row justify-content-center">
                      <div className="col-lg-5">
                          <div className="card shadow-lg border-0 rounded-lg mt-5 scale-up-center">
                              <div className=""><h3 className="tittle1">Recuperar contraseña</h3></div>
                              <hr/>
                              <div className="card-body">
                                  <form action="">
                                      <div className="medium mb-3 text-muted">
                                          <p>Ingresa tu email y te estaremos enviando la nueva contraseña.</p>
                                      </div>
                                      <div className="form-floating mb-3">
                                          <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                          <label htmlFor="inputEmail">Email</label>
                                      </div>
                                      <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                          <Link className="aP" to="/Login">Ingresa</Link>
                                          <Link className="buttonL" to="/Login">Recuperar</Link>
                                      </div>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Password
