"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <CircularProgress />
    </Typography>
  );
}
