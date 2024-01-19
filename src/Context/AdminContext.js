import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const storedAdmin = localStorage.getItem('tokenA');
  const storedDecodedAdmin = localStorage.getItem('decodedAdmin');
  const [authAdmin, setAuthAdmin] = useState(storedDecodedAdmin ? JSON.parse(storedDecodedAdmin) : null);

  console.log('storedAdmin', storedAdmin);
  console.log('authAdmin', authAdmin);

  const decodeAdmin = async (storedAdmin) => {
    try {
      console.log('decodificando tokenA:', storedAdmin)
      const decodedAdmin = jwtDecode(storedAdmin);
      console.log('tokenA decodificado:', decodedAdmin);
      if (decodedAdmin && decodedAdmin.exp * 1000 > Date.now()) {
        setAuthAdmin(decodedAdmin.data);
        localStorage.setItem('decodedAdmin', JSON.stringify(decodedAdmin.data));
        console.log('decoded Admin:', decodedAdmin.data);
      } else {
        console.log('Sesion expirada')
        logoutAdmin();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.',
        })
      }
    } catch (error) {
      console.error('Error al decodificar el tokenAdmin:', error);
      logoutAdmin();
    }
  }

  const loginAdmin = (storedAdmin) => {
    decodeAdmin(storedAdmin);
    localStorage.setItem('storedAdmin', storedAdmin);
  };

  useEffect( () => {
    if (storedAdmin) {
      decodeAdmin(storedAdmin);
    }else{
      return undefined;
    }
  }, [storedAdmin]);

  const logoutAdmin = () => {
    setAuthAdmin(null);
    localStorage.removeItem('tokenA');
    localStorage.removeItem('decodedAdmin');
  };

  return (
    <AdminContext.Provider value={{ authAdmin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
