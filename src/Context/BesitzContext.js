import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

const BesitzContext = createContext();

export const BesitzProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const storedDecodedToken = localStorage.getItem('decodedToken');
  const [authToken, setAuthToken] = useState(storedDecodedToken ? JSON.parse(storedDecodedToken) : null);

  console.log('storedToken:', storedToken);
  console.log('authToken:', authToken);

  const decodeToken = async (storedToken) => {
    try {
      console.log('Decodificando token:', storedToken);
      const decodedToken = jwtDecode(storedToken);
      console.log('Token decodificado:', decodedToken);
      if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
        setAuthToken(decodedToken.data);
        localStorage.setItem('decodedToken', JSON.stringify(decodedToken.data));
        console.log('Decoded Token:', decodedToken.data);
      } else {
        console.log('Sesion expirada');
        logoutBesitz();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.',
        });
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      logoutBesitz();
    }
  };

  const loginBesitz = (storedToken) => {
    decodeToken(storedToken);
    localStorage.setItem('storedToken', storedToken);
  };

  const logoutBesitz = () => {
    setAuthToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('decodedToken');
  };

  return (
    <BesitzContext.Provider value={{ authToken, loginBesitz, logoutBesitz }}>
      {children}
    </BesitzContext.Provider>
  );
};

export const useBesitz = () => useContext(BesitzContext);
