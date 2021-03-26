import Head from "next/head";
import { Flex, Box } from "@chakra-ui/react";
import Layout from "components/layout/Layout";
import Header from "components/layout/Header";
import Search from "components/search/Search";
import MenuList from "components/products/MenuList";

const Home = ({ foods, drinks }) => {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>

      <Layout>
        <Flex p={6}>
          <Box flex="1">
            <Header />
          </Box>
          <Box>
            <Search />
          </Box>
        </Flex>
      </Layout>
    </>
  );
};

// export async function getStaticProps() {}

export default Home;
