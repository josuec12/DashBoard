import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from '../components/Icon';

const Markers = () => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Auth');
        const newRegistros = response.data.docs || [];
        setRegistros(newRegistros);
      } catch (error) {
        console.error('Error al obtener datos del servidor', error);
      }
    };

    fetchData();
  }, []);

  const markers = registros.map((doc, index) => (
    <Marker key={index} position={[doc.lat, doc.lng]} icon={Icon}>
      <Popup>
        <p className='text-popup'>Nombre: {doc.userNom} <br /> Navegador: {doc.userAgent} <br />  Ubicación: {doc.ipAddress}    <br /> Tiempo de inicio: {doc.tiempo}</p>
      </Popup>
    </Marker>
  ));

  return markers;
};

export default Markers;
