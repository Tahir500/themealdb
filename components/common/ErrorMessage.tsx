"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";

export default function ErrorMessage() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      Some thing went wrong. Please try again later
    </Typography>
  );
}
