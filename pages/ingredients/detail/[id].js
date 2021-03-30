import React from "react";
import axios from "axios";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import Layout from "components/layout/Layout";
import Header from "components/layout/Header";
import ThumbCard from "components/products/ThumbCard";
import SidebarRight from "components/layout/SidebarRight";
import DescriptionCard from "components/products/_detail/ingredients/DescriptionCard";
import MealLists from "components/products/_detail/ingredients/MealLists";

const DetailIngredient = ({ ingredient, recommendationMeals }) => {
  console.log(recommendationMeals);

  const dataIngredient = ingredient[0];
  const { strIngredient, idIngredient, strDescription } = dataIngredient;
  const imageName = strIngredient.replace(/\s/g, "%20");
  const imageUrl = `https://www.themealdb.com/images/ingredients/${imageName}.png`;

  return (
    <>
      <Layout>
        <Box
          mr={useBreakpointValue({
            base: "0px",
            lg: "450px",
          })}
        >
          <Header title={strIngredient} />
          <Box my={2}>
            <ThumbCard image={imageUrl} />
          </Box>
          <DescriptionCard description={strDescription} />
        </Box>

        {useBreakpointValue({
          base: <></>,
          lg: (
            <SidebarRight>
              <MealLists title={strIngredient} meals={recommendationMeals} />
            </SidebarRight>
          ),
        })}
      </Layout>
    </>
  );
};

export default DetailIngredient;

export async function getServerSideProps(context) {
  const res = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const ingredients = await res.data.meals;
  const ingredient = ingredients.filter((ingredient) => {
    return ingredient.idIngredient === context.params.id;
  });

  const ingredientName = ingredient[0].strIngredient
    .toLowerCase()
    .replace(/\s/g, "%20");
  const resRecommendation = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`
  );
  const recommendationMeals = await resRecommendation.data.meals;

  return {
    props: {
      ingredient,
      recommendationMeals,
    },
  };
}
