"use client";
import ErrorMessage from "@/components/common/ErrorMessage";
import Loading from "@/components/common/Loading";
import { List, ListItem } from "@/interfaces";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { API, fetchList } from "../utils/api";
import { myLoader } from "../utils/common";
import { greyColor } from "../utils/constants";

export default function Home() {
  const { data, error, isLoading } = useQuery<List>({
    queryKey: ["list"],
    queryFn: fetchList
  });

  if (error) return <ErrorMessage />;
  if (isLoading) return <Loading />;
  if (!data) return null;

  const meals = data.meals;
  return (
    <Container maxWidth="lg">
      <Box
        display="grid"
        sx={{
          gap: 2,
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)"
          }
        }}
      >
        {meals.map((item: ListItem) => (
          <ImageListItem
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: greyColor
            }}
            key={item.idIngredient}
          >
            <Link href={`/ingredient/${item.strIngredient}`}>
              <Image
                unoptimized
                alt={item.strIngredient}
                loader={myLoader}
                src={`${API}/images/ingredients/${item.strIngredient}.png`}
                width={200}
                height={200}
                style={{ maxWidth: "100%" }}
              />
              <ImageListItemBar title={item.strIngredient} />
            </Link>
          </ImageListItem>
        ))}
      </Box>
    </Container>
  );
}
