import React from "react";
import axios from "axios";
import {
  Box,
  Text,
  HStack,
  VStack,
  Flex,
  Spacer,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BiListUl } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiFillYoutube } from "react-icons/ai";
import Layout from "components/layout/Layout";
import Header from "components/layout/Header";
import SidebarRight from "components/layout/SidebarRight";
import ThumbCard from "components/products/ThumbCard";
import IngredientList from "components/products/_detail/meals/IngredientList";
import InstructionCard from "components/products/_detail/meals/InstructionCard";

const DetailMeal = ({ meal, ingredients }) => {
  const {
    idMeal,
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strTags,
    strYoutube,
  } = meal;

  const ingredientMeasure = [
    { ingredient: meal.strIngredient1, measure: meal.strMeasure1 },
    { ingredient: meal.strIngredient2, measure: meal.strMeasure2 },
    { ingredient: meal.strIngredient3, measure: meal.strMeasure3 },
    { ingredient: meal.strIngredient4, measure: meal.strMeasure4 },
    { ingredient: meal.strIngredient5, measure: meal.strMeasure5 },
    { ingredient: meal.strIngredient6, measure: meal.strMeasure6 },
    { ingredient: meal.strIngredient7, measure: meal.strMeasure7 },
    { ingredient: meal.strIngredient8, measure: meal.strMeasure8 },
    { ingredient: meal.strIngredient9, measure: meal.strMeasure9 },
    { ingredient: meal.strIngredient10, measure: meal.strMeasure10 },
    { ingredient: meal.strIngredient11, measure: meal.strMeasure11 },
    { ingredient: meal.strIngredient12, measure: meal.strMeasure12 },
    { ingredient: meal.strIngredient13, measure: meal.strMeasure13 },
    { ingredient: meal.strIngredient14, measure: meal.strMeasure14 },
    { ingredient: meal.strIngredient15, measure: meal.strMeasure15 },
    { ingredient: meal.strIngredient16, measure: meal.strMeasure16 },
    { ingredient: meal.strIngredient17, measure: meal.strMeasure17 },
    { ingredient: meal.strIngredient18, measure: meal.strMeasure18 },
    { ingredient: meal.strIngredient19, measure: meal.strMeasure19 },
    { ingredient: meal.strIngredient20, measure: meal.strMeasure20 },
  ];

  const tags = strTags !== null ? strTags.split(",") : null;

  return (
    <>
      <Layout>
        <Box
          mr={useBreakpointValue({
            base: "0px",
            lg: "450px",
          })}
        >
          <Header title={`${strMeal}`} />
          <Flex mt={2} mb={3}>
            <HStack spacing="2px">
              <BiListUl fontSize="24px" style={{ color: "#6a6a6a" }} />
              <Text color="secondary.main" fontWeight="600">
                {strCategory}
              </Text>
            </HStack>
            <Spacer />
            <HStack spacing="2px">
              <HiOutlineLocationMarker
                fontSize="24px"
                style={{ color: "#6a6a6a" }}
              />
              <Text color="secondary.main" fontWeight="600">
                {strArea}
              </Text>
            </HStack>
          </Flex>
          <Box my={2}>
            <ThumbCard image={strMealThumb} />
          </Box>

          <Flex mb={2}>
            <Spacer />
            {strYoutube !== "" && (
              <a target="_blank" href={strYoutube}>
                <Button
                  leftIcon={<AiFillYoutube fontSize="18px" />}
                  bg="red.500"
                  colorScheme="red"
                >
                  Youtube Tutorial
                </Button>
              </a>
            )}
          </Flex>

          <VStack spacing={4}>
            <InstructionCard instructions={strInstructions} tags={tags} />
            {useBreakpointValue({
              base: (
                <Box
                  bg="white"
                  w="100%"
                  p={4}
                  borderRadius="15px"
                  display={useBreakpointValue({ base: "block", lg: "none" })}
                  boxShadow="lg"
                >
                  <IngredientList
                    ingredients={ingredients}
                    ingredientMeasure={ingredientMeasure}
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
              <IngredientList
                ingredients={ingredients}
                ingredientMeasure={ingredientMeasure}
              />
            </SidebarRight>
          ),
        })}
      </Layout>
    </>
  );
};

export default DetailMeal;

export async function getServerSideProps(context) {
  const resMeal = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${context.params.id}`
  );
  const meal = await resMeal.data.meals[0];

  const resIngredients = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  const ingredients = await resIngredients.data.meals;

  return {
    props: {
      meal,
      ingredients,
    },
  };
}
