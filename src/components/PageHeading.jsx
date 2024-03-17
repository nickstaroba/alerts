import { Typography } from "@mui/material";
import React from "react";

export const PageHeading = ({ heading }) => (
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
    {heading}
  </Typography>
);
