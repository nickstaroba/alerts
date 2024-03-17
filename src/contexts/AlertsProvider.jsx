import React from "react";

import { useAlertsReducer } from "../reducers/AlertsReducer";
import { AlertsContext } from "./AlertsContext";

export const AlertsProvider = ({ children }) => {
  const [state, dispatch] = useAlertsReducer();

  return (
    <AlertsContext.Provider value={{ state, dispatch }}>
      {children}
    </AlertsContext.Provider>
  );
};
