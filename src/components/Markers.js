import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from '../components/Icon';

const Markers = () => {
  const [lastLogins, setLastLogins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Auth');
        const registros = response.data.docs || [];
        const lastLoginsMap = new Map(); // Usamos un mapa para agrupar registros por usuario

        registros.forEach((registro) => {
          // Comprobamos si ya tenemos un registro para este usuario
          if (lastLoginsMap.has(registro.userNom)) {
            const existingLogin = lastLoginsMap.get(registro.userNom);
            // Si el registro actual es más reciente, lo reemplazamos
            if (registro.tiempo > existingLogin.tiempo) {
              lastLoginsMap.set(registro.userNom, registro);
            }
          } else {
            // Si no hay registro para este usuario, lo añadimos
            lastLoginsMap.set(registro.userNom, registro);
          }
        });

        // Convertimos el mapa a un array de los últimos ingresos
        const lastLoginsArray = Array.from(lastLoginsMap.values());
        setLastLogins(lastLoginsArray);
      } catch (error) {
        console.error('Error al obtener datos del servidor', error);
      }
    };

    fetchData();
  }, []);

  const markers = lastLogins.map((registro, index) => (
    <Marker key={index} position={[registro.lat, registro.lng]} icon={Icon}>
      <Popup>
        <p className='fw-bold'>Nombre: {registro.userNom} <br /> Usuario: {registro.userType} <br /> Navegador: {registro.userAgent} <br />  Ubicación: {registro.ipAddress}    <br /> Tiempo de inicio: {registro.tiempo}</p>
      </Popup>
    </Marker>
  ));

  return markers;
};

export default Markers;
