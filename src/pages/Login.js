import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div>
            <body className="wrapper">

                <div className="container">
                <img className="img2 scale-up-center" src={require('../imagenes/blanco.png')} />
                    <div className="card card-container scale-up-center">                          
                        <h3 className="tittle1">Ingresa aquí</h3>
                        <form className="form-signin">
                            <div className="form-floating mb-3">
                                <input className="form-control" id="inputNit" type="number" placeholder="654615231" />
                                <label for="inputNit">Nit</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control" id="inputPassword" type="password" placeholder="Password" />
                                <label for="inputPassword">Contraseña</label>
                            </div>
                            <div className="form-check mb-3">
                                <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                <label className="form-check-label" for="inputRememberPassword">Recuerdame</label>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                <Link className="a" to="/Password">Olvidó la contraseña?</Link>                                
                            </div>
                            <div className="login">
                            <Link className="btn-login" to="/HomeA">Ingresa</Link>
                            </div>
                        </form>
                    </div>
                </div>

            </body>
        </div>


    )
}

export default Login