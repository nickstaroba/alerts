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

export const useAlertsReducer = () =>
  useReducer(alertsReducer, [], () => [
    {
      href: "",
      id: uuid(),
      message: "Default alert loaded.",
      severity: "success",
      timeout: 3,
      title: "Done!",
    }, {
      href: "",
      id: uuid(),
      message: "Default alert loaded.",
      severity: "success",
      timeout: 5,
      title: "Done!",
    },
  ]);
