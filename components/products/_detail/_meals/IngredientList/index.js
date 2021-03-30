import React from "react";
import { Box, Flex, Heading, Divider, Text, Spacer } from "@chakra-ui/react";
import { BiPalette } from "react-icons/bi";

const IngredientList = ({ ingredientMeasure }) => {
  return (
    <>
      <Flex alignItems="center">
        <Heading fontFamily="body" as="h5" fontSize="2xl">
          Ingredients
        </Heading>
        <Spacer />
        <Box bg="secondary.main" p={2} borderRadius="50%">
          <Text fontSize="xl">
            <BiPalette />
          </Text>
        </Box>
      </Flex>
      <Divider borderColor="gray.200" my={2} />
      <Box>
        {ingredientMeasure.map((item, index) => {
          const { ingredient, measure } = item;

          return ingredient !== "" && measure !== " " ? (
            <div key={index}>
              <Flex py={1}>
                <Text>{ingredient}</Text>
                <Spacer />
                <Text>{measure}</Text>
              </Flex>
              <Divider my={1} />
            </div>
          ) : null;
        })}
      </Box>
    </>
  );
};

export default IngredientList;
