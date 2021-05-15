import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";
import * as api from "api";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Center,
  Stack,
  CircularProgress,
  useBreakpointValue
} from "@chakra-ui/react";
import { Header, GridListContainer } from "components/layout";
import { Search, IngredientCard } from "components/products";
import { DataPagination } from "components/common";

const Ingredients = ({ ingredients }) => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

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
    setLoading(true);
    setPage(newPage);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <>
      <Head>
        <title>FooDY | Ingredients</title>
      </Head>

      <Stack
        direction={useBreakpointValue({ base: "column", md: "row" })}
        mb={4}>
        <Header flex="1" title="Search and Find Ingredients" />
        <Search fetchSearch={fetchSearch} />
      </Stack>

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
          w="100%">
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
        </>
      )}

      {filterIngredients().length > 0 && (
        <DataPagination
          display="flex"
          justifyContent="flex-end"
          mt={4}
          count={filterIngredients().length}
          rowsPerPage={rowsPerPage}
          page={page}
          changePage={handleChangePage}
        />
      )}
    </>
  );
};

export default Ingredients;

export async function getStaticProps() {
  const res = await api.getIngredientList();
  const ingredients = await res.data.meals;

  return {
    props: {
      ingredients
    }
  };
}
