import React from "react";
import Head from "next/head";
import axios from "axios";
import { Box, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import { GrTextAlignLeft } from "react-icons/gr";
import Layout from "components/layout/Layout";
import SidebarRight from "components/layout/SidebarRight";
import Header from "components/layout/Header";
import ThumbCard from "components/products/ThumbCard";
import DescriptionCard from "components/products/_detail/DescriptionCard";
import MealLists from "components/products/_detail/MealLists";

const DetailCategory = ({ category, recommendationMeals }) => {
  const dataCategory = category[0];
  const {
    strCategory,
    strCategoryThumb,
    idCategory,
    strCategoryDescription,
  } = dataCategory;

  return (
    <>
      <Head>
        <title>FooDY | {strCategory}</title>
      </Head>

      <Layout>
        <Box
          mr={useBreakpointValue({
            base: "0px",
            lg: "450px",
          })}
        >
          <Header title={strCategory} />
          <Box my={2}>
            <ThumbCard image={strCategoryThumb} />
          </Box>
          <VStack spacing={4}>
            <DescriptionCard
              description={strCategoryDescription}
              title="Description"
              icon={<GrTextAlignLeft />}
              type="category"
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
                    title={`Meals in Category ${strCategory}`}
                    meals={recommendationMeals}
                    type="category"
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
                title={`Meals in Category ${strCategory}`}
                meals={recommendationMeals}
                type="category"
              />
            </SidebarRight>
          ),
        })}
      </Layout>
    </>
  );
};

export default DetailCategory;

export async function getServerSideProps(context) {
  const resCategories = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const categories = await resCategories.data.categories;
  const category = categories.filter((category) => {
    return category.idCategory === context.params.id;
  });

  const categoryName = category[0].strCategory;
  const resRecommendation = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );
  const recommendationMeals = await resRecommendation.data.meals;

  return {
    props: {
      category,
      recommendationMeals,
    },
  };
}
