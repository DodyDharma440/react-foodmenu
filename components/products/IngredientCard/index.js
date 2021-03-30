import React from "react";
import Link from "next/link";
import { Box, Text } from "@chakra-ui/react";

const IngredientCard = ({ item }) => {
  const { strIngredient, idIngredient } = item;

  const imageName = strIngredient.replace(/\s/g, "%20");
  const imageUrl = `https://www.themealdb.com/images/ingredients/${imageName}.png`;

  return (
    <Box w="100%">
      <Box bg="white" borderRadius="10px" p={4} boxShadow="md" mb={1}>
        <Box
          bgColor="gray.200"
          bgImage={`url(${imageUrl})`}
          bgSize="cover"
          bgPosition="center"
          h="120px"
          w="100%"
          borderRadius="10px"
        />
      </Box>
      <Link href={`ingredients/detail/${idIngredient}`}>
        <Text
          w="100%"
          px={1}
          fontSize="md"
          fontWeight="500"
          transition="all 0.3s"
          _hover={{ color: "secondary.main", cursor: "pointer" }}
        >
          {strIngredient}
        </Text>
      </Link>
    </Box>
  );
};

export default IngredientCard;
