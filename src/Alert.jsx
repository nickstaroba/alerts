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
  const [show, setShow] = useState(false);

  const handleCloseAlert = () => {
    setShow(false);
  };

  useEffect(() => {
    setShow(true);
  }, []);

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
    <Collapse
      in={show}
      onExit={() => {
        setTimeout(() => {
          handleClose(id);
        }, 500);
      }}
      timeout={500}
      unmountOnExit={true}
    >
      <MuiAlert onClose={handleCloseAlert} severity={severity}>
        {titleContent}
        {messageContent}
      </MuiAlert>
    </Collapse>
  );
};
