import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Password = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Enviar la solicitud de restablecimiento de contraseña al backend
      await axios.post('http://localhost:5000/Passwords', { email });
      Swal.fire(
        '¡Exito!',
        'Solicitud enviada correctamente.',
        'success'
      );
    } catch (error) {
      if (error.response) {
        // Si el servidor responde con un error
        const errorMessage = error.response.data.error || 'Error al enviar la solicitud. Por favor, inténtelo de nuevo más tarde.';
        Swal.fire('Error', errorMessage, 'error');
      } else if (error.request) {
        // Si no se recibe respuesta del servidor
        Swal.fire('Error', 'No se pudo conectar al servidor. Por favor, inténtelo de nuevo más tarde.', 'error');
      } else {
        // Si ocurre algún otro tipo de error
        Swal.fire('Error', 'Se produjo un error inesperado. Por favor, inténtelo de nuevo más tarde.', 'error');
      }
    }

    setLoading(false);
  };

  return (
    <>
      <div className="wrapper">
        <img className="img-login scale-up-center" alt="logo" src={require('../imagenes/Lblanco.png')} />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="card shadow-lg border-0 rounded-lg scale-up-center">
                <div className=""><h3 className="tittle1">Recuperar contraseña</h3></div>
                <hr />
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="medium mb-3 text-muted">
                      <p>Ingresa tu email y te estaremos enviando la nueva contraseña.</p>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="inputEmail"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label htmlFor="inputEmail">Email</label>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                      <Link className="a" to="/">Ingresa</Link>
                      <button type="submit" className="buttonL" disabled={loading}>
                        {loading ? 'Enviando...' : 'Recuperar'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Password;
