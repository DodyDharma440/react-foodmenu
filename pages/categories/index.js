import React from "react";
import Head from "next/head";
import axios from "axios";
import { Box, Text, Flex } from "@chakra-ui/react";
import Layout from "components/layout/Layout";
import Header from "components/layout/Header";
import GridListContainer from "components/layout/GridListContainer";
import CategoryCardLarge from "components/products/CategoryCardLarge";

const Categories = ({ categories }) => {
  console.log(categories);

  return (
    <>
      <Head>
        <title>FooDY | Categories</title>
      </Head>

      <Layout>
        <Flex mb={5}>
          <Box flex="1">
            <Header title="See All Categories" />
          </Box>
          {/* <Box>
            <Search fetchSearch={fetchSearch} />
          </Box> */}
        </Flex>

        <GridListContainer title="Category Lists">
          {categories.map((category, index) => {
            return <CategoryCardLarge category={category} />;
          })}
        </GridListContainer>
      </Layout>
    </>
  );
};

export default Categories;

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
