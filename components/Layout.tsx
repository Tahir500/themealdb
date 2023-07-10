import Container from "@mui/material/Container";
import * as React from "react";

interface Children {
  children: React.ReactNode;
}

export default function Layout({ children }: Children) {
  return (
    <Container sx={{ display: "flex", alignItems: "center" }}>
      {children}
    </Container>
  );
}
