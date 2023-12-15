import React, { createContext, useContext, useState } from 'react';

const BesitzContext = createContext();

export const BesitzProvider = ({ children }) => {
  const [Besitz, setBesitz] = useState(null);

  const loginBesitz = (BesitzData) => {
    setBesitz(BesitzData);
  };

  const logoutBesitz = () => {
    setBesitz(null);
  };

  return (
    <BesitzContext.Provider value={{ Besitz, loginBesitz, logoutBesitz }}>
      {children}
    </BesitzContext.Provider>
  );
};

export const useBesitz = () => useContext(BesitzContext);
