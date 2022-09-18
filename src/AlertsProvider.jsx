import React from "react";

import { AlertsContext } from "./AlertsContext";
import { AlertsManager } from "./AlertsManager";
import { useAlertsReducer } from "./AlertsReducer";

export const AlertsProvider = ({ children }) => {
  const [state, dispatch] = useAlertsReducer();

  return (
    <AlertsContext.Provider value={{ state, dispatch }}>
      <AlertsManager />
      {children}
    </AlertsContext.Provider>
  );
};
