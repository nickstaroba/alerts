import React, { createContext } from "react";
import { useAlertsReducer } from "./AlertsReducer";

export const AlertsContext = createContext({});

export const AlertsProvider = ({ children }) => {
  const [state, dispatch] = useAlertsReducer();

  return (
    <AlertsContext.Provider value={{ state, dispatch }}>
      {children}
    </AlertsContext.Provider>
  );
};
