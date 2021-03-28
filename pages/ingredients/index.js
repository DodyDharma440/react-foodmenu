import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";
import { Box, Flex } from "@chakra-ui/react";
import Layout from "components/layout/Layout";
import Header from "components/layout/Header";
import Search from "components/search/Search";
import GridListContainer from "components/layout/GridListContainer";
import IngredientCard from "components/products/IngredientCard";
import DataPagination from "components/common/DataPagination";

const Ingredients = ({ ingredients }) => {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 25;

  const fetchSearch = (inputValue) => {
    setSearchValue(inputValue);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Head>
        <title>Ingredients Page</title>
      </Head>

      <Layout>
        <Flex mb={5}>
          <Box flex="1">
            <Header title="Ingredients" />
          </Box>
          <Box>
            <Search fetchSearch={fetchSearch} />
          </Box>
        </Flex>

        <GridListContainer title="Ingredients Lists">
          {ingredients
            .filter((ingredient) => {
              if (searchValue === "") {
                return ingredient;
              } else {
                return ingredient.strIngredient
                  .toLowerCase()
                  .includes(searchValue.toLowerCase());
              }
            })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((ingredient, index) => {
              return <IngredientCard key={index} item={ingredient} />;
            })}
        </GridListContainer>

        <Flex justifyContent="flex-end">
          <DataPagination
            count={ingredients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            changePage={handleChangePage}
          />
        </Flex>
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
