import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
            <div className="text-center">
                <img 
                    className="mb-4 img-error" 
                    src={require('../imagenes/error404.jpg')} 
                    alt="Error 404 - Página no encontrada" 
                />
                <h1 className="display-4">404 - Página no encontrada</h1>
                <p className="lead">Lo sentimos, la URL solicitada no existe en este servidor.</p>
                <Link to="/" className="btn btn-primary">
                    <i className="fas fa-arrow-left me-1"></i>
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
};

export default Error404;