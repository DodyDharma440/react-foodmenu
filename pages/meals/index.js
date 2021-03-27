import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import { Box, Flex, Center, CircularProgress } from "@chakra-ui/react";
import Layout from "components/layout/Layout";
import Header from "components/layout/Header";
import HorizontalListContainer from "components/layout/HorizontalListContainer";
import GridListContainer from "components/layout/GridListContainer";
import CategoryCard from "components/products/CategoryCard";
import MealCard from "components/products/MealCard";

const Meal = ({ categories }) => {
  const [currentCategory, setCurrentCategory] = useState("Beef");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMeals = (currentCategory) => {
    setLoading(true);
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${currentCategory}`
      )
      .then((res) => {
        setMeals(res.data.meals);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    fetchMeals(category);
  };

  useEffect(() => {
    fetchMeals(currentCategory);
  }, []);

  return (
    <>
      <Head>
        <title>Meal Page</title>
      </Head>

      <Layout>
        <Flex mb={5}>
          <Box flex="1">
            <Header title="Meal Page" />
          </Box>
        </Flex>

        <HorizontalListContainer>
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              category={category}
              currentCategory={currentCategory}
              handleCategoryClick={handleCategoryClick}
            />
          ))}
        </HorizontalListContainer>

        {loading ? (
          <Center>
            <CircularProgress
              mt="20px"
              size="70px"
              isIndeterminate
              color="secondary.main"
            />
          </Center>
        ) : (
          <GridListContainer title={`Meals for ${currentCategory}`}>
            {meals.map((meal, index) => (
              <MealCard key={index} item={meal} />
            ))}
          </GridListContainer>
        )}
      </Layout>
    </>
  );
};

export default Meal;

export async function getStaticProps() {
  const resCategory = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const categories = await resCategory.data.categories;

  return {
    props: {
      categories,
    },
  };
}
