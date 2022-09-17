import { Alert as MuiAlert, AlertTitle, Collapse, Link } from "@mui/material";
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

  const COLLAPSE_TIMEOUT = 500;

  const handleCloseMuiAlert = () => {
    setCollapseIn(false);
  };

  const handleCollapseExit = () => {
    setTimeout(() => {
      handleClose(id);
    }, COLLAPSE_TIMEOUT);
  };

  useEffect(() => {
    setCollapseIn(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      handleCloseMuiAlert();
    }, timeoutSeconds * 1000);
  }, []);

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
      timeout={COLLAPSE_TIMEOUT}
      unmountOnExit={true}
    >
      <MuiAlert onClose={handleCloseMuiAlert} severity={severity} sx={sx}>
        {titleContent}
        {messageContent}
      </MuiAlert>
    </Collapse>
  );
};
