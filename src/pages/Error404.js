import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="text-center mt-4">
                            <img className="mb-4 img-error" src={require('../imagenes/error404.jpg')} alt="" />
                            <p className="lead">This requested URL was not found on this server.</p>
                            <Link to="/">
                                <i className="fas fa-arrow-left me-1"></i>
                                Regresa al home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error404
