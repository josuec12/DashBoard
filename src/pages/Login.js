import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useBesitz } from '../Context/BesitzContext.js';
import { useAdmin } from '../Context/AdminContext.js';

const Login = () => {
  const [nit, setNit] = useState('');
  const [pass, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [cedula, setCedula] = useState('');
  const [passw, setPassw] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [rememberMeA, setRememberMeA] = useState(false);
  const navigate = useNavigate();

  const { loginBesitz } = useBesitz();
  const { loginAdmin } = useAdmin();

  const [administrador, setAdministrador] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((!isAdmin && (!nit || !pass)) || (isAdmin && (!cedula || !passw))) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      const loginUrl = isAdmin ? 'http://localhost:5000/loginA' : 'http://localhost:5000/loginU';
      const loginData = isAdmin
        ? { cedula: cedula, passw: passw, rememberMeA: rememberMeA }
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
        const { token, tokenA } = result;
        localStorage.setItem('tokenA', tokenA);
        localStorage.setItem('token', token);

        localStorage.setItem('userType', isAdmin ? 'Admin' : 'Besitz');

        isAdmin ? loginAdmin(tokenA) : loginBesitz(token);

        Swal.fire({
          position: 'top-end',
          title: '¡Inicio de sesión exitoso!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(isAdmin ? '/HomeA' : '/Home');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error en el login',
          text: 'El usuario o contraseña son incorrectos.',
          showConfirmButton: false,
          timer: 1500,
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
    <div className="wrapper">
      <div>
        <Link to="https://besitz.co/">
          <img className="img-login scale-up-center" alt="Logo" src={require('../imagenes/Lblanco.png')} />
        </Link>
        <div className="container1 rounded ">
          <div className="row login1 scale-up-center">
            <div className="col side-image d-none d-lg-block"></div>
            <div className="col singin">
              <form className={`${administrador ? 'd-none' : ''}`} onSubmit={handleSubmit}>
                <h3 className="tittle1">Ingresa</h3>
                <div className="inputForm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" /><circle cx="12" cy="10" r="3" /><circle cx="12" cy="12" r="10" /></svg>
                  <input
                    className="inputF"
                    id="nit"
                    type="number"
                    placeholder="654615231"
                    value={nit}
                    onChange={(e) => setNit(e.target.value)}
                  />
                </div>
                <div className="inputForm">
                  <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
                  <input
                    className="inputF"
                    id="pass"
                    type={showPasswordIcon ? "text" : "password"}
                    placeholder="***********"
                    value={pass}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showPasswordIcon ? (
                    <svg viewBox="0 0 576 512" height="1em" className='eyeI' onClick={() => setShowPasswordIcon(!showPasswordIcon)} xmlns="http://www.w3.org/2000/svg">
                      <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
                      <rect x="-80" y="160" width="630" height="70" transform="rotate(-45 288 176)"></rect>
                    </svg>

                  ) : (
                    <svg viewBox="0 0 576 512" height="1em" className='eyeI' onClick={() => setShowPasswordIcon(!showPasswordIcon)} xmlns="http://www.w3.org/2000/svg"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
                  )}
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
                <div className="Ocontra">
                  <Link className="a" to="/Password">
                    Olvidó su contraseña?
                  </Link>
                </div>
                <div className="btn-login">
                  <button className="buttonL" type="submit">
                    Ingresa
                  </button>
                </div>

              </form>

              <form className={`${!administrador ? 'd-none' : ''}`} onSubmit={handleSubmit}>
                <h3 className="tittle1">Ingresa Admin</h3>
                <div className="inputForm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" /><circle cx="12" cy="10" r="3" /><circle cx="12" cy="12" r="10" /></svg>
                  <input
                    className="inputF"
                    id="cedula"
                    type="number"
                    placeholder="244565185"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                  />
                </div>
                <div className="inputForm">
                  <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
                  <input
                    className="inputF"
                    id="passw"
                    type={showPasswordIcon ? "text" : "password"}
                    placeholder="***********"
                    value={passw}
                    onChange={(e) => setPassw(e.target.value)}
                  />
                  {showPasswordIcon ? (
                    <svg viewBox="0 0 576 512" height="1em" className='eyeI' onClick={() => setShowPasswordIcon(!showPasswordIcon)} xmlns="http://www.w3.org/2000/svg">
                      <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
                      <rect x="-80" y="160" width="630" height="70" transform="rotate(-45 288 176)"></rect>
                    </svg>

                  ) : (
                    <svg viewBox="0 0 576 512" height="1em" className='eyeI' onClick={() => setShowPasswordIcon(!showPasswordIcon)} xmlns="http://www.w3.org/2000/svg"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
                  )}                </div>
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
                <div className='Ocontra'>
                  <Link className="a" to="/Password">
                    Olvidó su contraseña?
                  </Link>
                </div>
                <div className="btn-login">
                  <button className="buttonL" type="submit">
                    Ingresa
                  </button>
                </div>
              </form>
              <div className="btn-conteiner">
                <span className="btn-content" onClick={handleToggleUserType}>
                  <span className="btn-title">{administrador ? "Cliente" : "Admin"}</span>
                  <span className="icon-arrow">
                    <svg width="66px" height="40px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                      <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <path id="arrow-icon-one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                        <path id="arrow-icon-two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                        <path id="arrow-icon-three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
                      </g>
                    </svg>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
