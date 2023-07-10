"use client";
import ErrorMessage from "@/components/common/ErrorMessage";
import { LinkButton } from "@/components/common/LinkButton";
import Loading from "@/components/common/Loading";
import { Box, Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";

const MealComponent = ({ data, meals }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Typography mb={2} variant="h5">
            {data.name}
          </Typography>
          <Box bgcolor={greyColor} position="relative">
            <Image
              alt={data.name}
              loader={myLoader}
              layout="responsive"
              src={`${API}/images/ingredients/${id}.png`}
              width={200}
              height={200}
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
            {meals.map((item: any) => (
              <ImageListItem
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: greyColor
                }}
                key={item.idMeal}
              >
                <LinkButton href={`/meal/${item.idMeal}`}>
                  <Image
                    alt={item.strMeal}
                    loader={myLoader}
                    layout="responsive"
                    src={`${item.strMealThumb}`}
                    width={400}
                    height={300}
                  />
                  <ImageListItemBar title={item.strMeal} />
                </LinkButton>
              </ImageListItem>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
