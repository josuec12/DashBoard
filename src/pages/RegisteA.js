import React, {useState} from 'react'
import Swal from 'sweetalert2';
import zxcvbn from 'zxcvbn'

const RegisteA = () => {
    const [nom, setNom] = useState('');
    const [ape, setApe] = useState('');
    const [nitt, setNitt] = useState('');
    const [passw, setPassw] = useState('');
    const [emaila, setEmaila] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const passwordStrength = zxcvbn(passw);
  
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
        const response = await fetch('http://localhost:5000/Admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Asegúrate de especificar el tipo de contenido JSON
          },
          body: JSON.stringify({
            nom,
            ape,
            nitt,
            passw,
            emaila,
          }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          Swal.fire({
            title: '¡Buen trabajo!',
            text: 'Formulario enviado con éxito',
            icon: 'success',
          });
  
          // Limpiar los campos después del envío exitoso
          setNom('');
          setApe('');
          setNitt('');
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
      <div>
        <main>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <div className="input-field">
                  <label htmlFor="nom">Nombres</label>
                  <input type="text" className="input" id="nom" required value={nom} onChange={(e) => setNom(e.target.value)} autoComplete="off" placeholder="Josue" />
                </div>
              </div>
              <div className="col">
                <div className="input-field">
                  <label htmlFor="ape">Apellidos</label>
                  <input type="text" className="input" id="ape" required value={ape} onChange={(e) => setApe(e.target.value)} autoComplete="off" placeholder="Potter" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="input-field">
                  <label htmlFor="nitt">Nit</label>
                  <input type="number" className="input" id="nitt" required value={nitt} onChange={(e) => setNitt(e.target.value)} autoComplete="off" placeholder="965647482" />
                </div>
              </div>
              <div className="col">
                <div className="input-field">
                  <label htmlFor="passw">Contraseña</label>
                  <input type="password" className="input" id="passw" required value={passw} onChange={(e) => setPassw(e.target.value)} placeholder="***********"></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="input-field">
                  <label htmlFor="emaila">Email</label>
                  <input type="email" className="input" id="emaila" required value={emaila} onChange={(e) => setEmaila(e.target.value)} autoComplete="off" placeholder="name@example.com" />
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
    );
  };

export default RegisteA
