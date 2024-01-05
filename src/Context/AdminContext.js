import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const storedAdmin = localStorage.getItem('Admin');
  const [Admin, setAdmin] = useState(storedAdmin ? JSON.parse(storedAdmin) : null);

  const loginAdmin = (AdminData) => {
    setAdmin(AdminData);
    localStorage.setItem('Admin', JSON.stringify(AdminData));
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem('Admin');
  };

  return (
    <AdminContext.Provider value={{ Admin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
