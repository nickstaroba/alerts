import * as React from "react";
import Container from "@mui/material/Container";
import { AlertsExample } from "./AlertsExample";
import { AlertsManager } from "./AlertsManager";

export default function App() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <AlertsManager />
      <AlertsExample />
    </Container>
  );
}
