import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Route } from "wouter";

import { CreateAlert } from "./alerts/CreateAlert";
import { Header } from "./Header";
import { PageHeading } from "./PageHeading";

export default function App() {
  return (
    <>
      <Header />
      <Container sx={{ paddingY: 2 }} maxWidth={"sm"}>
        <Route path={"/"}>
          <PageHeading heading={"Alerts"} />
          <Typography>Welcome</Typography>
        </Route>
        <Route path={"/create"}>
          <CreateAlert />
        </Route>
        <Route path={"/page/:id"}>
          {({ id }) => (
            <Box>
              <PageHeading heading={`Page ${id}`} />
              <Typography>Filler text...</Typography>
            </Box>
          )}
        </Route>
      </Container>
    </>
  );
}
