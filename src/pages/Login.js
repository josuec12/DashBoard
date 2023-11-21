import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div>
            <div className="wrapper">
                <img className="img-login scale-up-center" alt="Logo" src={require('../imagenes/blanco.png')} />
                <div className="container1 rounded ">
                    <div className="row login1 scale-up-center">
                        <div className="col side-image d-none d-lg-block"></div>
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
                                <div className="checkbox-wrapper">
                                    <input id="recuerdame" name="checkbox" type="checkbox" />
                                    <label className="terms-label" htmlFor="recuerdame">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" className="checkbox-svg">
                                            <mask fill="white" id="path-1-inside-1_476_5-37">
                                                <rect height="200" width="200"></rect>
                                            </mask>
                                            <rect mask="url(#path-1-inside-1_476_5-37)" stroke-width="40" className="checkbox-box" height="200" width="200"></rect>
                                            <path stroke-width="15" d="M52 111.018L76.9867 136L149 64" className="checkbox-tick"></path>
                                        </svg>
                                        <span className="label-text">Recuerdame</span>
                                    </label>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                    <Link className="a" to="/Password">Olvidó la contraseña?</Link>
                                </div>
                                <div className="btn-login">
                                    <Link className="buttonL" to="/HomeA">Ingresa</Link>
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