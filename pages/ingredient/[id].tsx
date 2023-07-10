"use client";
import ErrorMessage from "@/components/common/ErrorMessage";
import { LinkButton } from "@/components/common/LinkButton";
import Loading from "@/components/common/Loading";
import { Ingredient, IngredientList } from "@/interfaces";
import { Box, Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { API, fetchIngredient } from "../utils/api";
import { myLoader } from "../utils/common";
import { greyColor } from "../utils/constants";

export default function MealPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useQuery<IngredientList>({
    queryKey: ["filter", id],
    queryFn: () => fetchIngredient(id as string)
  });

  if (error) return <ErrorMessage />;
  if (isLoading) return <Loading />;
  if (!data) return null;
  const meals = data.meals;

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Typography mb={2} variant="h5">
            {id}
          </Typography>
          <Box bgcolor={greyColor} position="relative">
            <Image
              alt={`${id}`}
              loader={myLoader}
              layout="responsive"
              src={`${API}/images/ingredients/${id}.png`}
              width={200}
              height={200}
              // priority={false}
              unoptimized
            />
          </Box>
        </Grid>

        <Grid item xs={7}>
          <Typography mb={2} variant="h5">
            Meals
          </Typography>

          <Box
            display="grid"
            sx={{
              gap: 2,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)"
              }
            }}
          >
            {meals.map(item => (
              <ListItem item={item} key={item.idMeal} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

const ListItem = ({ item }: { item: Ingredient }) => {
  return (
    <ImageListItem
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: greyColor
      }}
    >
      <LinkButton href={`/meal/${item.idMeal}`}>
        <Image
          alt={item.strMeal}
          loader={myLoader}
          layout="responsive"
          src={`${item.strMealThumb}`}
          width={400}
          height={300}
          unoptimized
        />
        <ImageListItemBar title={item.strMeal} />
      </LinkButton>
    </ImageListItem>
  );
};
