import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [Admin, setAdmin] = useState(null);

  const loginAdmin = (AdminData) => {
    setAdmin(AdminData);
    console.log(AdminData);
  };

  const logoutAdmin = () => {
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ Admin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
