import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useBesitz } from '../Context/BesitzContext.js';
import { useAdmin } from '../Context/AdminContext.js';

const Login = () => {
  const [nit, setNit] = useState('');
  const [pass, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [nitt, setNitt] = useState('');
  const [passw, setPassw] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [rememberMeA, setRememberMeA] = useState(false);
  const navigate = useNavigate();

  const { loginBesitz } = useBesitz(); 
  const { loginAdmin } = useAdmin();

  const [administrador, setAdministrador] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', isAdmin ? { nitt, passw } : { nit, pass });


    if ((!isAdmin && (!nit || !pass)) || (isAdmin && (!nitt || !passw))) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
      });
      return;
    }

    try {
      const loginUrl = isAdmin ? 'http://localhost:5000/loginA' : 'http://localhost:5000/loginU';
      const loginData = isAdmin
        ? { nitt: nitt, passw: passw, rememberMeA: rememberMeA }
        : { nit: nit, pass: pass, rememberMe: rememberMe };

      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (result && result.success) {
        const { token } = result;
        localStorage.setItem('token', token);

        localStorage.setItem('userType', isAdmin ? 'Admin' : 'Besitz');

        isAdmin ? loginAdmin(result.data) : loginBesitz(result.data);

        Swal.fire({
          title: '¡Bien hecho!',
          text: 'Inicio de sesión exitoso.',
          icon: 'success',
        });

        navigate(isAdmin ? '/HomeA' : '/Home');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error en el login',
          text: 'El usuario o contraseña son incorrectos.',
        });
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error inesperado',
        text: 'Hubo un error inesperado. Por favor, intenta nuevamente.',
      });
    }
  };

  // Manejar el cambio entre Cliente y Administrador
  const handleToggleUserType = () => {
    setAdministrador(!administrador);
    setIsAdmin(!isAdmin); // Cambiar el estado isAdmin cuando se cambia entre Cliente y Administrador
  };

  return (
    <div>
      <body className="wrapper">
      <div>
        <Link to="https://besitz.co/">
          <img className="img-login scale-up-center" alt="Logo" src={require('../imagenes/blanco.png')} />
        </Link>
        <div className="container1 rounded ">
          <div className="row login1 scale-up-center">
            <div className="col side-image d-none d-lg-block"></div>
            <div className="col singin">
            <form className={`form-signin ${administrador ? 'd-none' : ''}`} onSubmit={handleSubmit}>
                <h3 className="tittle1">Ingresa aquí</h3>               
                <div className="form-floating mb-3">
                <input
                    className="form-control"
                    id="nit"
                    type="number"
                    placeholder="654615231"
                    value={nit}
                    onChange={(e) => setNit(e.target.value)}
                  />
                  <label htmlFor="nit">Nit C</label>
                  </div> 
                <div className="form-floating mb-3">
                <input
                    className="form-control"
                    id="pass"
                    type="password"
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="pass">Contraseña C</label>
                </div>
                <div className="checkbox-wrapper">
                  <input
                    id="recuerdame"
                    name="checkbox"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label className="terms-label" htmlFor="recuerdame">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" className="checkbox-svg">
                      <mask fill="white" id="path-1-inside-1_476_5-37">
                        <rect height="200" width="200"></rect>
                      </mask>
                      <rect mask="url(#path-1-inside-1_476_5-37)" strokeWidth="40" className="checkbox-box" height="200" width="200"></rect>
                      <path strokeWidth="15" d="M52 111.018L76.9867 136L149 64" className="checkbox-tick"></path>
                    </svg>
                    <span className="label-text">Recuérdame</span>
                  </label>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                  <Link className="a" to="/Password">
                    Olvidó la contraseña?
                  </Link>
                </div>
                <div className="btn-login">
                  <button className="buttonL" type="submit">
                    Ingresa
                  </button>
                </div>  
                 
              </form>

              <form className={`form-signin ${!administrador ? 'd-none' : ''}`} onSubmit={handleSubmit}>
                <h3 className="tittle1">Ingresa aquí</h3>
                <div className="form-floating mb-3">
                <input
                        className="form-control"
                        id="nitt"
                        type="number"
                        placeholder="Admin Nit"
                        value={nitt}
                        onChange={(e) => setNitt(e.target.value)}
                      />
                      <label htmlFor="nitt">Nit A</label>
                </div>
                <div className="form-floating mb-3">
                <input
                        className="form-control"
                        id="passw"
                        type="password"
                        placeholder="Admin Password"
                        value={passw}
                        onChange={(e) => setPassw(e.target.value)}
                      />
                      <label htmlFor="passw">Contraseña A</label>
                </div>
                <div className="checkbox-wrapper">
                  <input
                    id="recuerdameA"
                    name="checkbox"
                    type="checkbox"
                    checked={rememberMeA}
                    onChange={() => setRememberMeA(!rememberMeA)}
                  />
                  <label className="terms-label" htmlFor="recuerdameA">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" className="checkbox-svg">
                      <mask fill="white" id="path-1-inside-1_476_5-37">
                        <rect height="200" width="200"></rect>
                      </mask>
                      <rect mask="url(#path-1-inside-1_476_5-37)" strokeWidth="40" className="checkbox-box" height="200" width="200"></rect>
                      <path strokeWidth="15" d="M52 111.018L76.9867 136L149 64" className="checkbox-tick"></path>
                    </svg>
                    <span className="label-text">Recuérdame</span>
                  </label>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                  <Link className="a" to="/Password">
                    Olvidó la contraseña?
                  </Link>
                </div>
                <div className="btn-login">
                  <button className="buttonL" type="submit">
                    Ingresa
                  </button>
                </div>    
              </form>
              {/* Alternar entre "Soy Cliente" y "Soy Administrador" */}
              <h6>
                {administrador ? "Soy Cliente" : "Soy Administrador"}
                <button className='buttonL' onClick={handleToggleUserType}>
                  {administrador ? "Acceder" : "Acceder"}
                </button>
              </h6>
              <div>            
              </div>  
            </div>
          </div>
        </div>
      </div>
      </body>
    </div>

  );
};

export default Login;
