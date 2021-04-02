import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";
import {
  Box,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Center,
  CircularProgress,
} from "@chakra-ui/react";
import Layout from "components/layout/Layout";
import Header from "components/layout/Header";
import Search from "components/products/Search";
import GridListContainer from "components/layout/GridListContainer";
import IngredientCard from "components/products/IngredientCard";
import DataPagination from "components/common/DataPagination";

const Ingredients = ({ ingredients }) => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 25;

  const filterIngredients = () => {
    return ingredients.filter((ingredient) => {
      if (searchValue === "") {
        return ingredient;
      } else {
        return ingredient.strIngredient
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      }
    });
  };

  const fetchSearch = (inputValue) => {
    setLoading(true);
    setSearchValue(inputValue);
    setPage(0);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Head>
        <title>FooDY | Ingredients</title>
      </Head>

      <Layout>
        <Flex mb={5}>
          <Box flex="1">
            <Header title="Search and Find Ingredients" />
          </Box>
          <Box>
            <Search fetchSearch={fetchSearch} />
          </Box>
        </Flex>

        {loading ? (
          <Center>
            <CircularProgress
              mt="20px"
              size="70px"
              isIndeterminate
              color="secondary.main"
            />
          </Center>
        ) : filterIngredients().length === 0 ? (
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
              Search Ingredients Failed
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Your search keyword doesn't match in our ingredient lists. Please
              input another keyword.
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <GridListContainer title="Ingredients Lists">
              {filterIngredients()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((ingredient, index) => {
                  return <IngredientCard key={index} item={ingredient} />;
                })}
            </GridListContainer>

            <Flex justifyContent="flex-end">
              <DataPagination
                count={filterIngredients().length}
                rowsPerPage={rowsPerPage}
                page={page}
                changePage={handleChangePage}
              />
            </Flex>
          </>
        )}
      </Layout>
    </>
  );
};

export default Ingredients;

export async function getStaticProps() {
  const res = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  const ingredients = await res.data.meals;

  return {
    props: {
      ingredients,
    },
  };
}
