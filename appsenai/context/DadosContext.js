import React, { createContext, useState } from 'react';

const Dados = createContext();

export const DadosProvider = ({ children }) => {
  const [imageUri, setImageUri] = useState(null);

  return (
    <Dados.Provider value={{ imageUri, setImageUri }}>
      {children}
    </Dados.Provider>
  );
};

export default Dados;
