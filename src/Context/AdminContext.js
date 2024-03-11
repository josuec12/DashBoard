import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [firstLoad, setFirstLoad] = useState(true);
  const storedAdminToken = localStorage.getItem('storedAdmin') || null;
  const storedDecodedAdminToken = localStorage.getItem('decodedAdmin');
  const [authAdmin, setAuthAdmin] = useState(storedDecodedAdminToken ? JSON.parse(storedDecodedAdminToken) : null);

  // Utiliza useCallback para memoizar la función decodeAdminToken
  const decodeAdminToken = useCallback(async (token) => {
    try {
      if (token) {
        const decodedAdminToken = jwtDecode(token);
        if (decodedAdminToken && decodedAdminToken.exp * 1000 > Date.now()) {
          setAuthAdmin(decodedAdminToken.data);
          localStorage.setItem('decodedAdmin', JSON.stringify(decodedAdminToken.data));
        } else {
          logoutAdmin();
          Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.',
          });
        }
      } else {
        // No hay token, por lo tanto, no hay autenticación de administrador
        setAuthAdmin(null);
      }
    } catch (error) {
      console.error('Error al decodificar el tokenAdmin:', error);
      logoutAdmin();
    }
  }, []);

  const loginAdmin = (token) => {
    decodeAdminToken(token);
    localStorage.setItem('storedAdmin', token);
  };

  useEffect(() => {
    if (!firstLoad && storedAdminToken) {
      decodeAdminToken(storedAdminToken);
    }
    setFirstLoad(false);
  }, [firstLoad, storedAdminToken, decodeAdminToken]);

  const logoutAdmin = () => {
    setAuthAdmin(null);
    localStorage.removeItem('storedAdmin');
    localStorage.removeItem('decodedAdmin');
  };

  return (
    <AdminContext.Provider value={{ authAdmin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
