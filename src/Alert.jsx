import {
  Alert as MuiAlert,
  AlertTitle,
  Collapse,
  LinearProgress,
  Link,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export const Alert = ({
  handleClose,
  href = "",
  id,
  message,
  severity,
  sx,
  timeoutSeconds = 10,
  title = "",
}) => {
  const [collapseIn, setCollapseIn] = useState(false);

  // The progress bar needs to account for the time to collapse the alert.
  const COLLAPSE_TIMEOUT_MS = 500;
  const COLLAPSE_TIMEOUT_SECONDS = COLLAPSE_TIMEOUT_MS / 1000;
  const INITIAL_PROGRESS_SECONDS = timeoutSeconds - COLLAPSE_TIMEOUT_SECONDS;
  const [progressSeconds, setProgressSeconds] = useState(
    INITIAL_PROGRESS_SECONDS
  );

  // The progress bar's value is based on a scale from 0 to 100
  const PROGRESS_RATIO = 100 / INITIAL_PROGRESS_SECONDS;
  const progressValue = progressSeconds * PROGRESS_RATIO;

  const handleCloseMuiAlert = () => {
    setCollapseIn(false);
  };

  const handleCollapseExit = () => {
    setTimeout(() => {
      handleClose(id);
    }, COLLAPSE_TIMEOUT_MS);
  };

  useEffect(() => {
    setCollapseIn(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      handleCloseMuiAlert();
    }, timeoutSeconds * 1000);
  }, [timeoutSeconds]);

  useEffect(() => {
    const PROGRESS_INTERVAL = 250;
    const PROGRESS_INTERVAL_SECONDS = PROGRESS_INTERVAL / 1000;
    if (progressSeconds) {
      setTimeout(
        () => setProgressSeconds(progressSeconds - PROGRESS_INTERVAL_SECONDS),
        PROGRESS_INTERVAL
      );
    }
  }, [progressSeconds]);

  const titleContent = title ? <AlertTitle>{title}</AlertTitle> : null;

  const messageContent = href ? (
    <Link href={href} sx={{ cursor: "pointer" }}>
      {message}
    </Link>
  ) : (
    message
  );

  return (
    <Collapse
      in={collapseIn}
      onExit={handleCollapseExit}
      timeout={COLLAPSE_TIMEOUT_MS}
      unmountOnExit={true}
    >
      <MuiAlert onClose={handleCloseMuiAlert} severity={severity} sx={sx}>
        {titleContent}
        {messageContent}
        <LinearProgress
          color={severity}
          sx={{ marginBottom: 1, marginTop: 2, opacity: 0.25, width: "100%" }}
          value={progressValue}
          variant={"determinate"}
        />
      </MuiAlert>
    </Collapse>
  );
};
