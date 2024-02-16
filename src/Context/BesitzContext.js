import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

const BesitzContext = createContext();

export const BesitzProvider = ({ children }) => {
  const storedToken = localStorage.getItem('storedToken');
  const storedDecodedToken = localStorage.getItem('decodedToken');
  const [authToken, setAuthToken] = useState(storedDecodedToken ? JSON.parse(storedDecodedToken) : null);

  const decodeToken = async (token) => {
    try {
      if(token){
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
        setAuthToken(decodedToken.data);
        localStorage.setItem('decodedToken', JSON.stringify(decodedToken.data));
      } else {
        console.log('Sesión expirada');
        logoutBesitz();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.',
        });
      }
    }else{
      // No hay token, por lo tanto, no hay autenticación de administrador
      setAuthToken(null);
    }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      logoutBesitz();
    }
  };

  const loginBesitz = (token) => {
    decodeToken(token);
    localStorage.setItem('storedToken', token);
  };

  useEffect(() => {
    if (storedToken) {
      decodeToken(storedToken);
    }
  }, [storedToken]);

  const logoutBesitz = () => {
    setAuthToken(null);
    localStorage.removeItem('storedToken');
    localStorage.removeItem('decodedToken');
  };

  return (
    <BesitzContext.Provider value={{ authToken, loginBesitz, logoutBesitz }}>
      {children}
    </BesitzContext.Provider>
  );
};


export const useBesitz = () => useContext(BesitzContext);
