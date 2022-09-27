import React from "react";

import { AlertsContext } from "./AlertsContext";
import { useAlertsReducer } from "./AlertsReducer";

export const AlertsProvider = ({ children }) => {
  const [state, dispatch] = useAlertsReducer();

  return (
    <AlertsContext.Provider value={{ state, dispatch }}>
      {children}
    </AlertsContext.Provider>
  );
};
