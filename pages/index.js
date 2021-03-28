import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import { Flex, Box } from "@chakra-ui/react";
import Layout from "components/layout/Layout";
import Header from "components/layout/Header";
import GridListContainer from "components/layout/GridListContainer";
import HorizontalListContainer from "components/layout/HorizontalListContainer";
import MealCard from "components/products/MealCard";
import IngredientCard from "components/products/IngredientCard";
import Banner from "components/products/Banner";

const Home = ({ meals, ingredients }) => {
  // const [meals, setMeals] = useState([]);

  // const category = [
  //   "Beef",
  //   "Chicken",
  //   "Dessert",
  //   "Lamb",
  //   "Miscellaneous",
  //   "Pasta",
  //   "Pork",
  //   "Seafood",
  //   "Side",
  //   "Starter",
  //   "Vegan",
  //   "Vegetarian",
  // ];
  // const randomCategory = Math.floor(Math.random() * category.length);

  // useEffect(() => {
  //   const urlMeals = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category[randomCategory]}`;
  //   axios
  //     .get(urlMeals)
  //     .then((res) => {
  //       setMeals(res.data.meals);
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // }, []);

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
        </Flex>

        <Box mb={8}>
          <HorizontalListContainer>
            {meals.slice(0, 3).map((meal, index) => (
              <Banner key={index} item={meal} />
            ))}
          </HorizontalListContainer>
        </Box>

        {meals.length > 4 ? (
          <GridListContainer title="Recommendation Meals" moreLink="/meals">
            {meals.slice(4, 10).map((meal, index) => (
              <MealCard key={index} item={meal} />
            ))}
          </GridListContainer>
        ) : null}

        <GridListContainer title="Popular Ingredients" moreLink="">
          {ingredients.slice(0, 10).map((ingredient, index) => (
            <IngredientCard key={index} item={ingredient} />
          ))}
        </GridListContainer>
      </Layout>
    </>
  );
};

export default Home;

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
