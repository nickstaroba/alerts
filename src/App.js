import * as React from "react";
import { CreateAlert } from "./CreateAlert";
import { Link, Route } from "wouter";
import { Box, Container, Typography } from "@mui/material";

export default function App() {
  return (
    <Container
      sx={{
        border: "1px solid #eee",
        borderWidth: "0 1px",
        display: "flex",
        flexDirection: "column",
        width: 300,
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gridGap: 12,
          padding: 2,
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/page/one">
          <a>One</a>
        </Link>
        <Link href="/page/two">
          <a>Two</a>
        </Link>
        <Link href="/create-alert">
          <a>Create Alert</a>
        </Link>
      </Box>
      <Route path="/">{() => <Typography>Home</Typography>}</Route>
      <Route path="/create-alert">{() => <CreateAlert />}</Route>
      <Route path="/page/:id">
        {({ id }) => (
          <Typography
            sx={{
              textTransform: "capitalize",
            }}
          >
            Page {id}
          </Typography>
        )}
      </Route>
    </Container>
  );
}
