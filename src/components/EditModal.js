import React, { useState } from 'react';


const EditModal = ({ registro, onSave }) => {
  const [editedData, setEditedData] = useState({
    ...registro,
  });

  const [selectedBoletin, setSelectedBoletin] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGuardar = () => {
    // Incluir el estado de 'selectedBoletin' y 'selectedLogo' al llamar a la función onSave
    onSave({ ...editedData, boletin: selectedBoletin, logo: selectedLogo });
  };

  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    if (file) {
      if (fileType === 'boletin') {
        setSelectedBoletin(file);
      } else if (fileType === 'logo') {
        setSelectedLogo(file);
      }
    } else {
      if (fileType === 'boletin') {
        setSelectedBoletin(null);
      } else if (fileType === 'logo') {
        setSelectedLogo(null);
      }
    }
  };

  return (
    <div>
      <div className='row'>
        <div className='col'>
          <div className='inputGroup'>
            <input type="text" name="nombre" value={editedData.nombre} onChange={handleInputChange} />
            <label>Nombre:</label>
          </div>
        </div>
        <div className='col'>
          <div className='inputGroup'>
            <input type="text" name="apellido" value={editedData.apellido} onChange={handleInputChange} />
            <label>Apellido:</label>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className='inputGroup'>
            <input type="text" name="nit" value={editedData.nit} onChange={handleInputChange} />
            <label>NIT:</label>
          </div>
        </div>
        <div className='col'>
          <div className='inputGroup'>
            <input type="text" name="pass" value={editedData.pass} onChange={handleInputChange} />
            <label>Contraseña:</label>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className=''>
          <div className='inputGroup'>
            <input type="text" name="email" value={editedData.email} onChange={handleInputChange} />
            <label>Email:</label>
          </div>
        </div>
      </div>
      <div className='row'>
      <div className='col'>
          <div className='inputGroup'>
            <input type="text" name="ventas" value={editedData.ventas} onChange={handleInputChange} />
            <label>Ventas:</label>
          </div>
        </div>
        <div className='col'>
          <div className='inputGroup'>
            <input type="text" name="financiero" value={editedData.financiero} onChange={handleInputChange} />
            <label>Financiero:</label>
          </div>
        </div>    
        <div className='row'>
        <div className='col'>
          <div className="input-field">
            <label htmlFor="boletin" className="custom-file-button">
              <svg className="svg-icon1" width="24" viewBox="0 0 24 24" height="24" fill="none"><g strokeWidth="2" strokeLinecap="round" stroke="#056dfa" fillRule="evenodd" clipRule="evenodd"><path d="m3 7h17c.5523 0 1 .44772 1 1v11c0 .5523-.4477 1-1 1h-16c-.55228 0-1-.4477-1-1z"></path><path d="m3 4.5c0-.27614.22386-.5.5-.5h6.29289c.13261 0 .25981.05268.35351.14645l2.8536 2.85355h-10z"></path></g></svg>
              Subir Boletín
            </label>
            <div className="aa">
              {selectedBoletin ? 'Archivo seleccionado: ' + selectedBoletin.name : 'Ningún archivo seleccionado'}
            </div>
            <input type="file" id="boletin" name="boletin" accept=".pdf, .doc, .docx" className="custom-input-file" onChange={(event) => handleFileChange(event, 'boletin')} />
          </div>
        </div>
          <div className='col'>
            <div className="input-field">
              <label htmlFor="logo" className="custom-file-button">
              <svg strokeLinejoin="round" strokeLinecap="round" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                      <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"></path>
                      <path d="M9 15l3 -3l3 3"></path>
                      <path d="M12 12l0 9"></path>
                    </svg>
                Subir Logo
              </label>
              <div className="aa">
                {selectedLogo ? 'Archivo seleccionado: ' + selectedLogo.name : 'Ningún archivo seleccionado'}
              </div>
              <input type="file" id="logo" name="logo" accept=".png, .jpg, .jpeg" className="custom-input-file" onChange={(event) => handleFileChange(event, 'logo')} />
            </div>
          </div>
        </div>
      </div>
      <button className="c-button c-button--gooey" onClick={handleGuardar}> Guardar
        <div className="c-button__blobs">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </button>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className='svg-gcb'>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"></feColorMatrix>
            <feBlend in="SourceGraphic" in2="goo"></feBlend>
          </filter>
        </defs>
      </svg>
    </div>

  );
};

export default EditModal;
