import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

const BesitzContext = createContext();

export const BesitzProvider = ({ children }) => {
  const [firstLoad, setFirstLoad] = useState(true);
  const storedToken = localStorage.getItem('storedToken') || null;
  const storedDecodedToken = localStorage.getItem('decodedToken');
  const [authToken, setAuthToken] = useState(storedDecodedToken ? JSON.parse(storedDecodedToken) : null);

  // Envuelve la definición de decodeToken en useCallback para evitar la advertencia
  const decodeToken = useCallback(async (token) => {
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
          icon: 'warning',
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
  }, []);

  const loginBesitz = (token) => {
    decodeToken(token);
    localStorage.setItem('storedToken', token);
  };

  useEffect(() => {
    if (!firstLoad && storedToken) {
      decodeToken(storedToken);
    }
    setFirstLoad(false);
  }, [firstLoad, storedToken, decodeToken]); // Agrega decodeToken al array de dependencias

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
