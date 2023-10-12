import React, { useState } from 'react'
import Register from './Register'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div>
            <div className="wrapper">
                <div className="container mainn">
                    <div className="login">
                        <div className="col-md-6 side-image"></div>
                        <div className="col-md-6 right">
                            <div className="input-box">
                                <header><h2 className="tittle">Ingresa aquí</h2></header>
                                <form>
                                    <div className="input-field">
                                        <input type="number" className="input" id="nit" required="" autocomplete="off" placeholder="965647482" />
                                        <label for="nit">Nit</label>
                                    </div>
                                    <div className="input-field">
                                        
                                        <input type="password" className="input" id="pass" required="" placeholder="***********"></input>
                                        <label for="pass">Contraseña</label>
                                    </div>
                                    <div className="input-field">
                                        <Link to="/Home" type="submit" className="submit">Entrar</Link>
                                    </div>
                                    <div className="signin">
                                        <Link className="a" to="/Password">Olvido su contraseña?</Link>
                                    </div>
                                </form> 

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login