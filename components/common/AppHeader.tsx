import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";

const Header = styled("header")(() => ({
  backdropFilter: "blur(8px)",
  backgroundColor: "rgba(255,255,255,0.8)",
  paddingTop: 20,
  paddingBottom: 20
}));

export default function AppHeader() {
  return (
    <Header>
      <Container sx={{ display: "flex", alignItems: "center" }}>
        <Link href="/">
          <Image
            unoptimized
            alt="logo"
            width={296}
            height={41}
            src="https://www.themealdb.com/images/logo-small.png"
          />
        </Link>
      </Container>
    </Header>
  );
}
