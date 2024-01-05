import React, { createContext, useContext, useState } from 'react';

const BesitzContext = createContext();

export const BesitzProvider = ({ children }) => {
  const storedBesitz = localStorage.getItem('Besitz');
  const [Besitz, setBesitz] = useState(storedBesitz ? JSON.parse(storedBesitz) : null);

  const loginBesitz = (BesitzData) => {
    setBesitz(BesitzData);
    localStorage.setItem('Besitz', JSON.stringify(BesitzData));
  };

  const logoutBesitz = () => {
    setBesitz(null);
    localStorage.removeItem('Besitz');
  };

  return (
    <BesitzContext.Provider value={{ Besitz, loginBesitz, logoutBesitz }}>
      {children}
    </BesitzContext.Provider>
  );
};

export const useBesitz = () => useContext(BesitzContext);
