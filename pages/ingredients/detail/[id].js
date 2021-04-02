import React from "react";
import Head from "next/head";
import axios from "axios";
import { Box, VStack, useBreakpointValue } from "@chakra-ui/react";
import { GrTextAlignLeft } from "react-icons/gr";
import Layout from "components/layout/Layout";
import Header from "components/layout/Header";
import ThumbCard from "components/products/ThumbCard";
import SidebarRight from "components/layout/SidebarRight";
import DescriptionCard from "components/products/_detail/DescriptionCard";
import MealLists from "components/products/_detail/MealLists";

const DetailIngredient = ({ ingredient, recommendationMeals }) => {
  const dataIngredient = ingredient[0];
  const { strIngredient, idIngredient, strDescription } = dataIngredient;
  const imageName = strIngredient.replace(/\s/g, "%20");
  const imageUrl = `https://www.themealdb.com/images/ingredients/${imageName}.png`;

  return (
    <>
      <Head>
        <title>FooDY | {strIngredient}</title>
      </Head>

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
          <VStack spacing={4}>
            <DescriptionCard
              description={strDescription}
              title="Description"
              icon={<GrTextAlignLeft />}
              type="ingredient"
            />
            {useBreakpointValue({
              base: (
                <Box
                  bg="white"
                  w="100%"
                  p={4}
                  borderRadius="15px"
                  boxShadow="lg"
                >
                  <MealLists
                    title={`Meals With ${strIngredient}`}
                    meals={recommendationMeals}
                    type="ingredient"
                  />
                </Box>
              ),
              lg: <></>,
            })}
          </VStack>
        </Box>

        {useBreakpointValue({
          base: <></>,
          lg: (
            <SidebarRight>
              <MealLists
                title={`Meals With ${strIngredient}`}
                meals={recommendationMeals}
                type="ingredient"
              />
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
