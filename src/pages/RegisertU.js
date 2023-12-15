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

const checkExistingNit = async (nit) => {
  try {
    const response = await fetch(`http://localhost:5000/checkNit/${nit}`);
    const result = await response.json();

    console.log('Response:', response);
    console.log('Result:', result);

    if (response.ok) {
      console.log('Nit exists:', result.exists);
      return result.exists;
    } else {
      console.error('Error en la respuesta del servidor:', result.error || 'Error desconocido');
      return false;
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    return false;
  }
};

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

    if (!boletin) {
      // Mostrar mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Archivo requerido',
        text: 'Por favor, selecciona un archivo.',
      });
      return;
    }

    const passwordStrength = zxcvbn(pass);

    if (passwordStrength.score < 3) {
      // Mostrar mensaje de error si la contraseña no cumple con los requisitos de fortaleza
      Swal.fire({
        icon: 'error',
        title: 'Contraseña débil',
        text: 'La contraseña debe tener al menos una letra minúscula, una letra mayúscula, un dígito y una longitud de al menos 6 caracteres.',
      });
      return;
    }

    try {
    
      const formData = new FormData();
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
            title: "Good job!",
            text: "Formulario enviado con éxito",
            icon: "success"
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
        title: 'Error inesperado',
        text: 'Hubo un error inesperado. Por favor, intenta nuevamente.',
      });
    }
  };


  const [selectedFile, setSelectedFile] = useState(null);

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

  return (
    <div>
            <main>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col">
                    <div className="input-field">
                      <label htmlFor="nombre">Nombres</label>
                      <input type="text" className="input" id="nombre" required value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="off" placeholder="Josue" />
                    </div>
                  </div>
                  <div className="col">
                    <div className="input-field">
                      <label htmlFor="apellido">Apellidos</label>
                      <input type="text" className="input" id="apellido" required value={apellido} onChange={(e) => setApellido(e.target.value)} autoComplete="off" placeholder="Potter" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="input-field">
                      <label htmlFor="nit">Nit</label>
                      <input type="number" className="input" id="nit" required value={nit} onChange={(e) => setNit(e.target.value)} autoComplete="off" placeholder="965647482" />
                    </div>
                  </div>
                  <div className="col">
                    <div className="input-field">
                      <label htmlFor="pass">Contraseña</label>
                      <input type="password" className="input" id="pass" required value={pass} onChange={(e) => setPass(e.target.value)} placeholder="***********"></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="input-field">
                      <label htmlFor="email">Email</label>
                      <input type="email" className="input" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" placeholder="name@example.com" />
                    </div>
                  </div>
                  <div className="col">
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
                    <div className="input-field">
                      <label htmlFor="ventas">Link Ventas</label>
                      <input type="url" className="input" id="ventas" required value={ventas} onChange={(e) => setVentas(e.target.value)} placeholder="https://www.example.com/"></input>

                    </div>
                  </div>
                  <div className="col">
                    <div className="input-field">
                      <label htmlFor="financiero">Link Financiero</label>
                      <input type="url" className="input" id="financiero" required value={financiero} onChange={(e) => setFinanciero(e.target.value)} placeholder="https://www.example.com/"></input>
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
          </div>
  )
}

export default RegisterU