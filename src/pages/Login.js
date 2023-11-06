import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div>
            <div className="wrapper">
                <img className="img2 scale-up-center" alt="Logo" src={require('../imagenes/blanco.png')} />
                <div className="container1 rounded ">
                    <div className="row login1 scale-up-center">
                        {/* <div className="col side-image d-none d-lg-block"></div> */}
                        <div className="col singin">
                            <form className="form-signin">
                                <h3 className="tittle1">Ingresa aquí</h3>
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="inputNit" type="number" placeholder="654615231" />
                                    <label htmlFor="inputNit">Nit</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="inputPassword" type="password" placeholder="Password" />
                                    <label htmlFor="inputPassword">Contraseña</label>
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                    <label className="form-check-label" htmlFor="inputRememberPassword">Recuerdame</label>
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
                </div>


            </div>
        </div>


    )
}

export default Login