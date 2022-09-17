import { Box } from "@mui/material";
import React, { useContext } from "react";
import { Alert } from "./Alert";
import { AlertsContext } from "./AlertsContext";
import { ALERT_ACTIONS } from "./AlertsReducer";

export const AlertsManager = () => {
  const { state: alerts, dispatch } = useContext(AlertsContext);

  const handleCloseAlert = (id) => {
    dispatch({ type: ALERT_ACTIONS.REMOVE_ALERT, id });
  };

  const alertsContent =
    alerts.length > 0
      ? alerts.map(({ id, message, severity, timeout, title, href }) => {
          return (
            <Alert
              key={id}
              id={id}
              message={message}
              handleClose={handleCloseAlert}
              severity={severity}
              sx={{ marginBottom: 2, width: 300 }}
              timeoutSeconds={timeout}
              title={title}
              href={href}
            />
          );
        })
      : null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        position: "absolute",
        right: 0,
        top: 0,
      }}
    >
      {alertsContent}
    </Box>
  );
};
