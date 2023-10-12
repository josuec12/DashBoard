import React from 'react'
import { Link } from 'react-router-dom'

const Password = () => {
  return (
      <div>
          <div className="wrapper">
              <div className="container mainn">
                  <div className="row justify-content-center">
                      <div className="col">
                          <div class="card text-center shadow-lg">
                              <div class="card-header">
                              <h3 class="tittle">Recuperar Contraseña</h3>
                              </div>
                              <div class="card-body">
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
          </div>
      </div>
  )
}

export default Password
