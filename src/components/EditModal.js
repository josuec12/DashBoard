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
          <div className='inputGroup'>
            <input type="text" name="boletin" value={editedData.boletin} onChange={handleInputChange} />
            <label>Boletín:</label>
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
