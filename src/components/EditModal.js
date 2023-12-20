import React, { useState } from 'react';

const EditModal = ({ registro, onSave }) => {
  const [editedData, setEditedData] = useState({
    ...registro,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGuardar = () => {
    onSave(editedData);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
    } else {
      setSelectedFile(null);
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
        <div className='col'>
          <div className='inputGroup'>
            <input type="text" name="email" value={editedData.email} onChange={handleInputChange} />
            <label>Email:</label>
          </div>
        </div>
        <div className='col'>
          <div className='inputGroup'>
            <input type="text" name="ventas" value={editedData.ventas} onChange={handleInputChange} />
            <label>Ventas:</label>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className='inputGroup'>
            <input type="text" name="financiero" value={editedData.financiero} onChange={handleInputChange} />
            <label>Financiero:</label>
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
          {/* <div className='inputGroup'>
            <input type="text" name="boletin" value={editedData.boletin} onChange={handleInputChange} />
            <label>Boletín:</label>
          </div> */}
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
