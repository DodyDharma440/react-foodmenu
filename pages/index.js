import React from "react";
import axios from "axios";
import Head from "next/head";
import { Flex, Box } from "@chakra-ui/react";
import Layout from "components/layout/Layout";
import Header from "components/layout/Header";
import Search from "components/search/Search";
import ListContainer from "components/products/ListContainer";
import MealCard from "components/products/MealCard";
import IngredientCard from "components/products/IngredientCard";
import Banner from "components/products/Banner";

const Home = ({ meals, ingredients }) => {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>

      <Layout>
        <Flex mb={5}>
          <Box flex="1">
            <Header />
          </Box>
          <Box>
            <Search />
          </Box>
        </Flex>

        <Box mb={8}>
          <Box
            overflow="auto"
            whiteSpace="nowrap"
            sx={{
              "&::-webkit-scrollbar": {
                height: "10px",
                borderRadius: "8px",
                backgroundColor: "gray.300",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "8px",
                backgroundColor: "primary.main",
              },
            }}
          >
            {meals.slice(0, 3).map((meal, index) => (
              <Banner key={index} item={meal} />
            ))}
          </Box>
        </Box>

        {meals.length > 4 ? (
          <ListContainer title="Recommendation Meals">
            {meals.slice(4, 10).map((meal, index) => (
              <MealCard key={index} item={meal} />
            ))}
          </ListContainer>
        ) : null}

        <ListContainer title="Popular Ingredients">
          {ingredients.slice(0, 10).map((ingredient, index) => (
            <IngredientCard key={index} item={ingredient} />
          ))}
        </ListContainer>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const category = [
    "Beef",
    "Chicken",
    "Dessert",
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Starter",
    "Vegan",
    "Vegetarian",
  ];
  const randomCategory = Math.floor(Math.random() * category.length);
  const urlMeals = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category[randomCategory]}`;
  const resMeals = await axios.get(urlMeals);
  const meals = await resMeals.data.meals;

  const urlIngredients =
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
  const resIngredients = await axios.get(urlIngredients);
  const ingredients = await resIngredients.data.meals;

  return {
    props: {
      meals,
      ingredients,
    },
  };
}

export default Home;
