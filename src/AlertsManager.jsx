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
      ? alerts.map(({ id, message, severity, timeLimit, title, url }) => {
          return (
            <Alert
              key={id}
              id={id}
              message={message}
              handleClose={handleCloseAlert}
              severity={severity}
              timeLimit={timeLimit}
              title={title}
              url={url}
            />
          );
        })
      : null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gridGap: 12,
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
