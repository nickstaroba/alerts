import "./styles.css";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "wouter";

import { AlertsProvider } from "./AlertsProvider";
import App from "./App";
import theme from "./theme";

const currentLocation = () => window.location.hash.replace(/^#/, "") || "/";

const navigate = (to) => {
  window.location.hash = to;
};

const useHashLocation = () => {
  const [loc, setLoc] = useState(currentLocation());

  useEffect(() => {
    const handleHashchange = () => setLoc(currentLocation());

    window.addEventListener("hashchange", handleHashchange);
    return () => window.removeEventListener("hashchange", handleHashchange);
  }, []);

  return [loc, navigate];
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AlertsProvider>
      <Router hook={useHashLocation}>
        <App />
      </Router>
    </AlertsProvider>
  </ThemeProvider>
);
