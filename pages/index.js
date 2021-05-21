import React from "react";
import Head from "next/head";
import * as api from "api";
import {
  Header,
  GridListContainer,
  HorizontalListContainer
} from "components/layout";
import { MealCard, IngredientCard, Banner } from "components/products";

const Home = ({ meals, ingredients }) => {
  return (
    <>
      <Head>
        <title>FooDY | Home</title>
      </Head>

      <Header mb={5} />

      <HorizontalListContainer mb={8}>
        {meals.slice(0, 3).map((meal, index) => (
          <Banner key={index} item={meal} />
        ))}
      </HorizontalListContainer>

      {meals.length > 4 ? (
        <GridListContainer
          mb={6}
          title="Recommendation Meals"
          moreLink="/meals">
          {meals.slice(4, 14).map((meal, index) => (
            <MealCard key={index} item={meal} />
          ))}
        </GridListContainer>
      ) : null}

      <GridListContainer title="Popular Ingredients" moreLink="/ingredients">
        {ingredients.slice(0, 10).map((ingredient, index) => (
          <IngredientCard key={index} item={ingredient} />
        ))}
      </GridListContainer>
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
    "Vegetarian",
    "Breakfast"
  ];
  const randomIndex = Math.floor(Math.random() * category.length);

  const resMeals = await api.getMealsByCategory(category[randomIndex]);
  const meals = await resMeals.data.meals;

  const resIngredients = await api.getIngredientList();
  const ingredients = await resIngredients.data.meals;

  return {
    props: {
      meals,
      ingredients
    }
  };
}
