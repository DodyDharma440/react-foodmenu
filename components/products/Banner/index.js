import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import axios from "axios";
import { Box, Text, Grid, GridItem, Flex, Button } from "@chakra-ui/react";

const childBox = css`
  &:nth-last-of-type(1) {
    margin-right: 0px;
  }
`;

const Banner = ({ item }) => {
  const { strMeal, strMealThumb, idMeal } = item;
  const [detail, setDetail] = useState({});

  useEffect(async () => {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    await setDetail(res.data.meals[0]);
  }, []);

  return (
    <Box
      w="700px"
      bg="white"
      h="300px"
      borderRadius="15px"
      display="inline-block"
      verticalAlign="top"
      marginRight="10px"
      mb={4}
      bgImage={`url(${strMealThumb})`}
      bgSize="cover"
      css={childBox}
    >
      <Box
        borderRadius="15px"
        style={{ backdropFilter: "brightness(25%)" }}
        h="100%"
      >
        <Grid
          templateColumns="repeat(5, 1fr)"
          h="100%"
          gap={2}
          p={4}
          whiteSpace="normal"
        >
          <GridItem colSpan={2}>
            <Flex alignItems="flex-end" h="100%">
              <Box mb={4}>
                <Text as="h4" fontSize="3xl" fontWeight="bold" color="white">
                  {strMeal.slice(0, 40)}
                  {strMeal.length > 40 ? "..." : null}
                </Text>
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color="secondary.main"
                  mb={3}
                >
                  {detail.strCategory}
                </Text>
                <a href={detail.strYoutube} target="_blank">
                  <Button
                    bg="primary.main"
                    color="gray.800"
                    _hover={{
                      background: "primary.dark",
                    }}
                    _active={{
                      background: "primary.dark",
                    }}
                  >
                    See Tutorial
                  </Button>
                </a>
              </Box>
            </Flex>
          </GridItem>
          <GridItem colSpan={3}>
            <Box
              w="100%"
              h="100%"
              borderRadius="20px"
              bgImage={`url(${strMealThumb})`}
              bgSize="cover"
            ></Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default Banner;
