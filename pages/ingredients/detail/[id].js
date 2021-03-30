import React from "react";
import axios from "axios";
import { Box, Text } from "@chakra-ui/react";
import Layout from "components/layout/Layout";

const DetailIngredient = ({ ingredient }) => {
  const dataIngredient = ingredient[0];
  const { strIngredient, idIngredient, strDescription } = dataIngredient;

  return (
    <>
      <Layout>
        <Box>Halaman detail ingredient</Box>
        <Text>Id nya adalah {idIngredient}</Text>
        <Text>Namanya {strIngredient}</Text>
        <Text>{strDescription}</Text>
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

  return {
    props: {
      ingredient,
    },
  };
}
