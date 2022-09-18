import React, { createContext } from "react";
import { useAlertsReducer } from "./AlertsReducer";
import { AlertsManager } from "./AlertsManager";

export const AlertsContext = createContext({});

export const AlertsProvider = ({ children }) => {
  const [state, dispatch] = useAlertsReducer();

  return (
    <AlertsContext.Provider value={{ state, dispatch }}>
      <AlertsManager />
      {children}
    </AlertsContext.Provider>
  );
};
