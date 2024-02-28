import React, { useState } from 'react'
import Swal from 'sweetalert2';
import zxcvbn from 'zxcvbn';

const RegisterU = () => {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nit, setNit] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [boletin, setBoletin] = useState(null);
  const [ventas, setVentas] = useState('');
  const [financiero, setFinanciero] = useState('');
  const [logo, setLogo] = useState(null);

  const [showPasswordIconU, setShowPasswordIconU] = useState(false);

  const checkExistingNit = async (nit) => {
    try {
      const response = await fetch(`http://localhost:5000/checkNit/${nit}`);
      if (response.ok) {
        // NIT no existe
        return false;
      } else if (response.status === 409) {
        // NIT ya existe
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

  const checkExistingEmail = async (nit) => {
    try {
      const response = await fetch(`http://localhost:5000/checkEmail/${email}`);
      if (response.ok) {
        // Email no existe
        return false;
      } else if (response.status === 409) {
        // Email ya existe
        return true;
      } else {
        // Otro error
        throw new Error('Error en la verificación del Email');
      }
    } catch (error) {
      console.error('Error en la verificación del Email:', error);
      throw error;
    }
  };

  const allowedDomains = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com", 'besitz.co'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si ya existe un documento con el mismo NIT
    const existingNit = await checkExistingNit(nit);

    if (existingNit) {
      // El NIT ya existe, muestra una alerta
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El NIT ya existe. Por favor, ingresa otro NIT.',
      });
      return;
    }

    // Verificar si ya existe un documento con el mismo Email
    const existingEmail = await checkExistingEmail(email);

    if (existingEmail) {
      // El Email ya existe, muestra una alerta
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El Email ya existe. Por favor, ingresa otro Email.',
      });
      return;
    }

    const isValidDomain = allowedDomains.some((domain) => email.endsWith(domain));

    if (!isValidDomain) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingresa un correo electrónico válido.'
      });
      return;
    }

    if (!boletin) {
      // Mostrar mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Archivo requerido',
        text: 'Por favor, selecciona un archivo.',
      });
      return;
    }

    if (!logo) {
      // Mostrar mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Archivo requerido',
        text: 'Por favor, selecciona un archivo.',
      });
      return;
    }

    if (nit.length !== 9) {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El NIT debe tener una longitud de 9 dígitos.',
      });
      return;

    }

    const passwordStrength = zxcvbn(pass);


    if (passwordStrength.score < 3) {
      // Construir la lista de requisitos no cumplidos
      const requirements = [];

      if (!/[A-Z]/.test(pass)) {
        requirements.push('Debe tener al menos una letra mayúscula.');
      }

      if (!/\d/.test(pass)) {
        requirements.push('Debe tener al menos un dígito.');
      }

      if (pass.length < 8) {
        requirements.push('Debe tener una longitud de al menos 8 caracteres.');
      }

      if (passwordStrength.score < 3) {
        requirements.push(`Con un puntaje de fortaleza más alto. El actual es: ${passwordStrength.score}`);
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

      const formData = new FormData();
      formData.append('logo', logo);
      formData.append('boletin', boletin);
      formData.append('nombre', nombre);
      formData.append('apellido', apellido);
      formData.append('nit', nit);
      formData.append('pass', pass);
      formData.append('email', email);
      formData.append('ventas', ventas);
      formData.append('financiero', financiero);


      // Realizar una solicitud al backend para insertar los datos
      const response = await fetch('http://localhost:5000/Besitz', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Formulario enviado correctamente',
          showConfirmButton: false,
          timer: 1500
        });

        // Limpiar los campos después del envío exitoso
        setNombre('');
        setApellido('');
        setNit('');
        setPass('');
        setEmail('');
        setBoletin(null);
        setVentas('');
        setFinanciero('');
        setSelectedFile(null);
        setLogo(null);
        setSelectedImg(null);

      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message || "Error al enviar el formulario",
        });
      }

      console.log(result);

    } catch (error) {
      console.log(error);
      console.error('Error al enviar el formulario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error inesperado. Por favor, intenta nuevamente.',
        showConfirmButton: false,
        timer: 1500,
        width: 520
      });
    }
  };


  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBoletin(file);
      setSelectedFile(file.name);
    } else {
      setBoletin(null);
      setSelectedFile(null);
    }
  };

  const handleImgChange = (event) => {
    const img = event.target.files[0];
    if (img) {
      setLogo(img);
      setSelectedImg(img.name);
    } else {
      setLogo(null);
      setSelectedImg(null);
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
                <input type="text" className="inputF" id="nombre" required value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="off" placeholder="Josue" />
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
                <input type="text" className="inputF" id="apellido" required value={apellido} onChange={(e) => setApellido(e.target.value)} autoComplete="off" placeholder="Potter" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="inputForm">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
                <input type="number" className="inputF" id="nit" required value={nit} onChange={(e) => setNit(e.target.value)} autoComplete="off" placeholder="965647482" />
              </div>
            </div>
            <div className="col">
              <div className="inputForm">
                <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
                <input type={showPasswordIconU ? "text" : "password"} className="inputF" id="pass" required value={pass} onChange={(e) => setPass(e.target.value)} placeholder="***********"></input>
                {showPasswordIconU ? (
                  <svg viewBox="0 0 576 512" height="1em" className='eyeA' onClick={() => setShowPasswordIconU(!showPasswordIconU)} xmlns="http://www.w3.org/2000/svg">
                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
                    <rect x="-80" y="160" width="630" height="70" transform="rotate(-45 288 176)"></rect>
                  </svg>

                ) : (
                  <svg viewBox="0 0 576 512" height="1em" className='eyeA' onClick={() => setShowPasswordIconU(!showPasswordIconU)} xmlns="http://www.w3.org/2000/svg"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
                )}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className="col">
              <div className="input-field">
                <label htmlFor="logo" className="custom-file-button">
                  <svg className='svg-icon1' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#056dfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M20.4 14.5L16 10 4 20" /></svg>
                  Subir Logo
                </label>
                <div className="aa">
                  {selectedImg ? 'Archivo seleccionado: ' + selectedImg : 'Ningún archivo seleccionado'}
                </div>
                <input type="file" id="logo" name="logo" accept="image/*" className="custom-input-file" onChange={handleImgChange} />
              </div>
            </div>
            <div className='col'>
              <div className="input-field">
                <label htmlFor="boletin" className="custom-file-button">
                  <svg className="svg-icon1" width="24" viewBox="0 0 24 24" height="24" fill="none"><g strokeWidth="2" strokeLinecap="round" stroke="#056dfa" fillRule="evenodd" clipRule="evenodd"><path d="m3 7h17c.5523 0 1 .44772 1 1v11c0 .5523-.4477 1-1 1h-16c-.55228 0-1-.4477-1-1z"></path><path d="m3 4.5c0-.27614.22386-.5.5-.5h6.29289c.13261 0 .25981.05268.35351.14645l2.8536 2.85355h-10z"></path></g></svg>
                  Subir Boletín
                </label>
                <div className="aa">
                  {selectedFile ? 'Archivo seleccionado: ' + selectedFile : 'Ningún archivo seleccionado'}
                </div>
                <input type="file" id="boletin" name="boletin" accept=".pdf, .doc, .docx" className="custom-input-file" onChange={handleFileChange} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="inputForm">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                <input type="url" className="inputF" id="ventas" required value={ventas} onChange={(e) => setVentas(e.target.value)} placeholder="https://www.example.com/Ventas"></input>

              </div>
            </div>
            <div className="col">
              <div className="inputForm">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                <input type="url" className="inputF" id="financiero" required value={financiero} onChange={(e) => setFinanciero(e.target.value)} placeholder="https://www.example.com/Financiero"></input>
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
                <input type="email" className="inputF" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" placeholder="name@example.com" />
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
  )
}

export default RegisterU