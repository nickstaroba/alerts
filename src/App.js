import { Box, Container, Typography } from "@mui/material";
import * as React from "react";
import { Route } from "wouter";

import { CreateAlert } from "./CreateAlert";
import { Header } from "./Header";

export default function App() {
  return (
    <>
      <Header />
      <Container sx={{ paddingY: 2 }} maxWidth={"sm"}>
        <Route path="/">
          <CreateAlert />
        </Route>
        <Route path="/page/:id">
          {({ id }) => (
            <Box>
              <Typography
                component={"h1"}
                sx={{
                  color: "#000",
                  opacity: 0.6,
                  fontSize: 24,
                  fontWeight: 700,
                  marginY: 2,
                  textTransform: "capitalize",
                }}
              >
                Page {id}
              </Typography>
              <Typography>Filler text...</Typography>
            </Box>
          )}
        </Route>
      </Container>
    </>
  );
}
