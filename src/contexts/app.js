import React, { createContext, useContext, useState } from "react";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [drones, setDrones] = useState([]);

  function addNewDrone(drone) {
    setDrones((current) => [...current, drone]);
  }

  return (
    <AppContext.Provider value={{ drones, addNewDrone }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}

export default AppContext;
