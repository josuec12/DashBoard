import React, { useState } from 'react';

const EditModalA = ({ registro, onSave }) => {
  const [editedData, setEditedData] = useState(registro);

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
        <div className='col-1'></div>

        <div className='col-5'>
          <div className="inputGroup">
            <input name="nom" type="text" value={editedData.nom} onChange={handleInputChange} />
            <label htmlFor="nom">Nombre</label>
          </div>
        </div>
        <div className='col-5'>
          <div className="inputGroup">
            <input type="text" name="ape" value={editedData.ape} onChange={handleInputChange} />
            <label>Apellido:</label>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-1'></div>
        <div className='col-5'>
          <div className="inputGroup">
            <input type="text" name="cedula" value={editedData.cedula} onChange={handleInputChange} />
            <label>Cedula:</label>
          </div>
        </div>
        <div className='col-5'>
          <div className="inputGroup">
            <input type="text" name="passw" value={editedData.passw} onChange={handleInputChange} />
            <label>Contraseña:</label>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'></div>
        <div className='col-5'>
          <div className="inputGroup">
            <input type="text" name="emaila" value={editedData.emaila} onChange={handleInputChange} />
            <label>Email:</label>
          </div>
        </div>
        <div className='col'></div>
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

export default EditModalA;
