import React from 'react'
import { Link } from 'react-router-dom'
const Error500 = () => {
  return (
    <div>
        <div className="container">
        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="text-center mt-4">
                                    <img className="mb-4 img-error" src={require('../imagenes/505.png')} alt="" />
                                    <p className="lead">Internal server error.</p>
                                    <Link to="/Home">
                                    <i className="fas fa-arrow-left me-1"></i>
                                        Regresa al Home
                                    </Link>
                                </div>
                            </div>
                        </div>
        </div>
    </div>
  )
}

export default Error500
