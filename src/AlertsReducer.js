import { useReducer } from "react";
import { v4 as uuid } from "uuid";

export const ALERT_ACTIONS = {
  ADD_ALERT: "ADD_ALERT",
  REMOVE_ALERT: "REMOVE_ALERT",
};

export const alertsReducer = (state, action) => {
  switch (action.type) {
    case ALERT_ACTIONS.ADD_ALERT:
      return [...state, action.payload];
    case ALERT_ACTIONS.REMOVE_ALERT:
      return [...state.filter((alert) => alert.id !== action.id)];
    default:
      return state;
  }
};

const MOCK_ALERT = {
  href: "",
  id: uuid(),
  message: "This is an example alert. It will expire in 10 seconds.",
  severity: "info",
  timeout: 5,
  title: "Welcome",
};

export const useAlertsReducer = () =>
  useReducer(alertsReducer, [], () => new Array(1).fill(MOCK_ALERT));
