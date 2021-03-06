import React from "react";
import Head from "next/head";
import * as api from "api";
import {
  Box,
  Flex,
  VStack,
  useBreakpointValue,
  useColorModeValue
} from "@chakra-ui/react";
import { GrTextAlignLeft } from "react-icons/gr";
import { Header, SidebarRight } from "components/layout";
import { ThumbCard } from "components/products";
import { DescriptionCard, MealLists } from "components/products/_detail";
import { FavouriteButton } from "components/common";

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

      <Box
        mr={useBreakpointValue({
          base: "0px",
          lg: "450px"
        })}>
        <Header title={strIngredient} />
        <ThumbCard my={2} image={imageUrl} />

        <Flex mb={2} alignItems="center">
          <FavouriteButton fontSize="3xl" item={dataIngredient} isIngredient />
        </Flex>

        <VStack spacing={4}>
          <DescriptionCard
            description={strDescription}
            title="Description"
            icon={<GrTextAlignLeft />}
            type="ingredient"
          />
          {useBreakpointValue({
            base: (
              <MealLists
                bg={useColorModeValue("white", "gray.800")}
                w="100%"
                p={4}
                borderRadius="15px"
                boxShadow="lg"
                title={`Meals With ${strIngredient}`}
                meals={recommendationMeals}
                type="ingredient"
              />
            ),
            lg: <></>
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
        )
      })}
    </>
  );
};

export default DetailIngredient;

export async function getServerSideProps(context) {
  const res = await api.getIngredientList();
  const ingredients = await res.data.meals;
  const ingredient = ingredients.filter((ingredient) => {
    return ingredient.idIngredient === context.params.id;
  });

  const ingredientName = ingredient[0].strIngredient
    .toLowerCase()
    .replace(/\s/g, "%20");
  const resRecommendation = await api.getMealsByIngredient(ingredientName);
  const recommendationMeals = await resRecommendation.data.meals;

  return {
    props: {
      ingredient,
      recommendationMeals
    }
  };
}
