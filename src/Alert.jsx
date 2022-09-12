import { Alert as MuiAlert, AlertTitle, Collapse, Link } from "@mui/material";
import React, { useEffect, useState } from "react";

export const Alert = ({
  handleClose,
  id,
  message,
  severity,
  timeLimit = 10,
  title,
  url,
}) => {
  const [show, setShow] = useState(true);

  const handleCloseAlert = () => {
    setShow(false);
    handleClose(id);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleCloseAlert();
    }, timeLimit * 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const titleContent = title ? <AlertTitle>{title}</AlertTitle> : null;

  const messageContent = url ? (
    <Link href={url} sx={{ cursor: "pointer" }}>
      {message}
    </Link>
  ) : (
    message
  );

  return (
    <Collapse in={show} unmountOnExit={true}>
      <MuiAlert onClose={handleCloseAlert} severity={severity}>
        {titleContent}
        {messageContent}
      </MuiAlert>
    </Collapse>
  );
};
