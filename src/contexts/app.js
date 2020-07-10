import React, { createContext, useContext, useState } from "react";

// import { Container } from './styles';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [drones, setDrone] = useState([]);

  return (
    <AppContext.Provider value={{ drones, setDrone }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  debugger;
  return useContext(AppContext);
}

export default AppContext;
