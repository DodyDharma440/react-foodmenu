import React from "react";
import Link from "next/link";
import { Box, Flex, Divider, Text, Spacer } from "@chakra-ui/react";
import { BiPalette } from "react-icons/bi";
import HeaderMedium from "components/common/HeaderMedium";

const IngredientList = ({ ingredients, ingredientMeasure, ...props }) => {
  return (
    <Box {...props}>
      <HeaderMedium title="Ingredients" icon={<BiPalette />} />
      <Box>
        {ingredientMeasure.map((item, index) => {
          const { ingredient, measure } = item;
          let ingredientID;
          const lowerCaseIngredient =
            ingredient.length > 0 ? ingredient.toLowerCase() : ingredient;
          ingredients.filter((data) => {
            if (lowerCaseIngredient === data.strIngredient.toLowerCase()) {
              return (ingredientID = data.idIngredient);
            }
          });

          return ingredient !== "" && measure !== " " ? (
            <div key={index}>
              <Flex py={1}>
                <Link
                  href={
                    ingredientID !== undefined
                      ? `/ingredients/detail/${ingredientID}`
                      : `/ingredients`
                  }>
                  <Text
                    textTransform="capitalize"
                    _hover={{ color: "secondary.main", cursor: "pointer" }}>
                    {ingredient}
                  </Text>
                </Link>
                <Spacer />
                <Text>{measure}</Text>
              </Flex>
              <Divider my={1} />
            </div>
          ) : null;
        })}
      </Box>
    </Box>
  );
};

export default IngredientList;
