"use client";
import ErrorMessage from "@/components/common/ErrorMessage";
import { LinkButton } from "@/components/common/LinkButton";
import Loading from "@/components/common/Loading";
import { MealItem, MealList } from "@/interfaces";
import { Box, Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { API, fetchMeal } from "../utils/api";
import { myLoader } from "../utils/common";
import { greyColor } from "../utils/constants";
import { useMeals } from "../utils/hooks";

export default function MealPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useQuery<MealList>({
    queryKey: ["filter", id],
    queryFn: () => fetchMeal(id as string)
  });

  const mealsData = useMeals(data);
  if (error) return <ErrorMessage />;
  if (isLoading) return <Loading />;
  if (!data) return null;
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Typography mb={2} variant="h5">
            {mealsData.meal?.strMeal}
          </Typography>
          <Box bgcolor={greyColor} position="relative">
            <Image
              alt={`${mealsData.meal?.strMeal}`}
              loader={myLoader}
              layout="responsive"
              src={`${mealsData.meal?.strMealThumb}`}
              width={200}
              height={200}
            />
          </Box>
        </Grid>

        <Grid item xs={7}>
          <Typography mb={2} variant="h5">
            Ingredients
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
            {mealsData.list.map((item: any) => (
              <ListItem
                item={item}
                key={`${item.strMeasure} ${item.strIngredient}`}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

const ListItem = ({ item }: { item: MealItem }) => (
  <ImageListItem
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: greyColor
    }}
  >
    <LinkButton href={`/ingredient/${item.strIngredient}`}>
      <Image
        alt={item.strIngredient}
        loader={myLoader}
        layout="responsive"
        src={`${API}/images/ingredients/${item.strIngredient}.png`}
        width={300}
        height={300}
        unoptimized
      />
      <ImageListItemBar title={`${item.strMeasure} ${item.strIngredient}`} />
    </LinkButton>
  </ImageListItem>
);
