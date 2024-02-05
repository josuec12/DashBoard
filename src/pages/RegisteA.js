import React, { useState } from 'react'
import Swal from 'sweetalert2';
import zxcvbn from 'zxcvbn'

const RegisteA = () => {
  const [nom, setNom] = useState('');
  const [ape, setApe] = useState('');
  const [cedula, setCedula] = useState('');
  const [passw, setPassw] = useState('');
  const [emaila, setEmaila] = useState('');

  const [showPasswordIconA, setShowPasswordIconA] = useState(false);

  const checkExistingCedula = async (cedula) => {
    try {
      const response = await fetch(`http://localhost:5000/checkCedula/${cedula}`);
      console.log('Status:', response.status);

      if (response.ok) {
        // NIT no existe
        console.log('entro');
        return false;
      } else if (response.status === 409) {
        // NIT ya existe
        console.log('entro 409');
        return true;
      } else {
        // Otro error
        throw new Error('Error en la verificación del NIT');
      }
    } catch (error) {
      console.error('Error en la verificación del NIT:', error);
      throw error;
    }
  };

  const checkExistingEmaila = async (emaila) => {
    try {
      const response = await fetch(`http://localhost:5000/checkEmaila/${emaila}`);
      console.log('Status:', response.status);

      if (response.ok) {
        // Email no existe
        console.log('entro');
        return false;
      } else if (response.status === 409) {
        // Email ya existe
        console.log('entro 409');
        return true;
      } else {
        // Otro error
        throw new Error('Error en la verificación del email');
      }
    } catch (error) {
      console.error('Error en la verificación del email:', error);
      throw error;
    }
  };

  const allowedDomains = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com"];


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si ya existe un documento con el mismo NIT
    const existingCedula = await checkExistingCedula(cedula);

    if (existingCedula) {
      // El NIT ya existe, muestra una alerta
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El NIT ya existe. Por favor, ingresa otro NIT.',
      });
      return;
    }

    const existingEmaila = await checkExistingEmaila(emaila);

    if (existingEmaila) {
      // El NIT ya existe, muestra una alerta
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El Email ya existe. Por favor, ingresa otro Email.',
      });
      return;
    }

    const isValidDomain = allowedDomains.some((domain) => emaila.endsWith(domain));

    if (!isValidDomain) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingresa un correo electrónico válido.'
      });
      return;
    }

    if (cedula.length !== 10) {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `La cédula debe tener exactamente 10 dígitos.`
      })
      return;
    }

    const passwordStrength = zxcvbn(passw);


    if (passw !== null && passwordStrength.score < 3) {
      // Construir la lista de requisitos no cumplidos
      const requirements = [];

      if (!/[A-Z]/.test(passw)) {
        requirements.push('Debe tener al menos una letra mayúscula.');
      }

      if (!/\d/.test(passw)) {
        requirements.push('Debe tener al menos un dígito.');
      }

      if (passw.length < 8) {
        requirements.push('Debe tener una longitud de al menos 8 caracteres.');
      }

      // Mostrar mensaje de error con requisitos no cumplidos
      Swal.fire({
        icon: 'error',
        title: 'Contraseña débil',
        html: `<p>La contraseña no cumple con los requisitos de fortaleza. Debe cumplir con lo siguiente:</p>
                <ul style="text-align: left;">
                    ${requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>`,
      });
      return;
    }


    try {
      const response = await fetch('http://localhost:5000/Admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Asegúrate de especificar el tipo de contenido JSON
        },
        body: JSON.stringify({
          nom,
          ape,
          cedula,
          passw,
          emaila,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Formulario enviado correctamente',
          icon: 'success',
        });

        // Limpiar los campos después del envío exitoso
        setNom('');
        setApe('');
        setCedula('');
        setPassw('');
        setEmaila('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.message || 'Error al enviar el formulario',
        });
      }

      console.log(result);

    } catch (error) {
      console.log(error);
      console.error('Error al enviar el formulario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error inesperado',
        text: 'Hubo un error inesperado. Por favor, intenta nuevamente.',
      });
    }
  };

  return (
    <>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <div className="inputForm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                  <line x1="7" y1="9" x2="17" y2="9" />
                  <line x1="7" y1="15" x2="17" y2="15" />
                  <line x1="11" y1="4" x2="11" y2="20" />
                </svg>
                <input type="text" className="inputF" id="nom" required value={nom} onChange={(e) => setNom(e.target.value)} autoComplete="off" placeholder="Josue" />
              </div>
            </div>
            <div className="col">
              <div className="inputForm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                  <line x1="7" y1="9" x2="17" y2="9" />
                  <line x1="7" y1="15" x2="17" y2="15" />
                  <line x1="11" y1="4" x2="11" y2="20" />
                </svg>
                <input type="text" className="inputF" id="ape" required value={ape} onChange={(e) => setApe(e.target.value)} autoComplete="off" placeholder="Potter" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="inputForm">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
                <input type="number" className="inputF" id="cedula" required value={cedula} onChange={(e) => setCedula(e.target.value)} autoComplete="off" placeholder="9656474823" />
              </div>
            </div>
            <div className="col">
              <div className="inputForm">
                <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
                <input type={showPasswordIconA ? "text" : "password"} className="inputF" id="passw" required value={passw} onChange={(e) => setPassw(e.target.value)} placeholder="***********"></input>
                {showPasswordIconA ? (
                  <svg viewBox="0 0 576 512" height="1em" className='eyeA' onClick={() => setShowPasswordIconA(!showPasswordIconA)} xmlns="http://www.w3.org/2000/svg">
                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
                    <rect x="-80" y="160" width="630" height="70" transform="rotate(-45 288 176)"></rect>
                  </svg>

                ) : (
                  <svg viewBox="0 0 576 512" height="1em" className='eyeA' onClick={() => setShowPasswordIconA(!showPasswordIconA)} xmlns="http://www.w3.org/2000/svg"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="inputForm">
                <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" >
                  <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#141B34" d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"></path>
                  <path strokeLinejoin="round" strokeWidth="1.5" stroke="#141B34" d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"></path>
                </svg>
                <input type="email" className="inputF" id="emaila" required value={emaila} onChange={(e) => setEmaila(e.target.value)} autoComplete="off" placeholder="name@example.com" />
              </div>
            </div>
          </div>
          <div className="btn-regis">
            <button className="CartBtn" type="submit">
              <span className="IconContainer">
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16" id="IconChangeColor" transform="scale(-1, 1)">
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" id="mainIconPathAttribute" fill="#ffffff"></path>
                  <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" id="mainIconPathAttribute" fill="#ffffff"></path>
                </svg>
              </span>
              <p className="textoo">Registrar</p>
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default RegisteA
