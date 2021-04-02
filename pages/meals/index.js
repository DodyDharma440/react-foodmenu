import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import {
  Box,
  Center,
  CircularProgress,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useBreakpointValue,
} from "@chakra-ui/react";
import Layout from "components/layout/Layout";
import Header from "components/layout/Header";
import Search from "components/products/Search";
import HorizontalListContainer from "components/layout/HorizontalListContainer";
import GridListContainer from "components/layout/GridListContainer";
import CategoryCard from "components/products/CategoryCard";
import MealCard from "components/products/MealCard";

const Meal = ({ categories }) => {
  const [currentCategory, setCurrentCategory] = useState("Beef");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

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
        setErrorMessage(err.message);
        setLoading(false);
      });
  };

  const fetchSearch = (inputValue) => {
    setCurrentCategory("");
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
      .then((res) => {
        setMeals(res.data.meals);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
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
        <title>FooDY | Meals</title>
      </Head>

      <Layout>
        <Stack direction={useBreakpointValue({ base: "column", md: "row" })}>
          <Box flex="1">
            <Header title="Find and Explore the Meals You Want" />
          </Box>
          <Box>
            <Search fetchSearch={fetchSearch} />
          </Box>
        </Stack>

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
        ) : errorMessage ? (
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            p={6}
            borderRadius="15px"
            w="100%"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Search Meals Failed
            </AlertTitle>
            <AlertDescription maxWidth="sm">{errorMessage}</AlertDescription>
          </Alert>
        ) : meals === null ? (
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            p={6}
            borderRadius="15px"
            w="100%"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Search Meals Failed
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Your search keyword doesn't match in our meal lists. Please input
              another keyword.
            </AlertDescription>
          </Alert>
        ) : (
          <GridListContainer
            title={`Meals ${
              currentCategory !== "" ? `for ${currentCategory}` : "Lists"
            }`}
          >
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
