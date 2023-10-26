import React from 'react'
import { Link } from 'react-router-dom'

const Password = () => {
  return (
      <div>
          <body className="wrapper">
          <img className="img2 scale-up-center" src={require('../imagenes/blanco.png')} />    
              <div className="container">          
                  <div className="row justify-content-center">
                      <div className="col-lg-5">
                          <div className="card shadow-lg border-0 rounded-lg mt-5 scale-up-center">
                              <div className=""><h3 className="tittle1">Recuperar contraseña</h3></div>
                              <hr></hr>
                              <div className="card-body">
                                  <form action="">
                                      <div className="medium mb-3 text-muted">
                                          <p>Ingresa tu email y te estaremos enviando la nueva contraseña.</p>
                                      </div>
                                      <div className="form-floating mb-3">
                                          <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                          <label for="inputEmail">Email</label>
                                      </div>
                                      <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                          <Link className="a1" to="/Login">Ingresa</Link>
                                          <Link className="submit" to="/Login">Recuperar</Link>
                                      </div>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </body>
      </div>
  )
}

export default Password
