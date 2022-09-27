import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, Box, IconButton, Popover, Tooltip } from "@mui/material";
import pluralize from "pluralize";
import React, { useContext, useEffect } from "react";

import { Alert } from "./Alert";
import { AlertsContext } from "./AlertsContext";
import { ALERT_ACTIONS } from "./AlertsReducer";

export const AlertsManager = () => {
  const { state: alerts, dispatch } = useContext(AlertsContext);
  const [anchorAlerts, setAnchorAlerts] = React.useState(null);

  const handleOpenAlerts = (event) => {
    if (alerts.length !== 0) setAnchorAlerts(event.currentTarget);
  };

  const handleCloseAlerts = () => {
    setAnchorAlerts(null);
  };

  const handleCloseAlert = (id) => {
    dispatch({ type: ALERT_ACTIONS.REMOVE_ALERT, id });
  };

  useEffect(() => {
    if (alerts.length === 0) handleCloseAlerts();
  }, [alerts]);

  const alertsContent =
    alerts.length > 0
      ? alerts.map(({ id, message, severity, timeout, title, href }) => (
          <Alert
            key={id}
            id={id}
            message={message}
            handleClose={handleCloseAlert}
            severity={severity}
            sx={{
              marginX: 1,
              width: { sm: 300 },
              ".MuiAlert-message": { width: "100%" },
            }}
            timeoutSeconds={timeout}
            title={title}
            href={href}
          />
        ))
      : null;

  return (
    <Box>
      <Tooltip
        title={`${alerts.length} ${pluralize("Alert", alerts.length)}`}
        placement={"top-end"}
      >
        <IconButton
          aria-controls={"alerts"}
          aria-haspopup={"true"}
          aria-label={`show ${alerts.length} alerts`}
          color={"inherit"}
          onClick={handleOpenAlerts}
        >
          <Badge
            badgeContent={alerts.length}
            color={"error"}
            invisible={alerts.length === 0}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={anchorAlerts}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        id={"alerts"}
        keepMounted
        onClose={handleCloseAlerts}
        open={!!anchorAlerts}
        PaperProps={{ sx: { paddingY: 1, width: { xs: "100%", sm: "auto" } } }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        {alertsContent && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {alertsContent}
          </Box>
        )}
      </Popover>
    </Box>
  );
};
