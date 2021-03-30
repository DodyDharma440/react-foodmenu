import React from "react";
import { Box, Text } from "@chakra-ui/react";

const CategoryCardLarge = ({ category }) => {
  const { strCategory, strCategoryThumb } = category;

  return (
    <Box w="100%">
      <Box
        bgColor="white"
        borderRadius="15px"
        color="black"
        boxShadow="lg"
        transition="0.5s"
        _hover={{
          backgroundImage: `url(${strCategoryThumb})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          transform: "scale(1.02)",
          cursor: "pointer",
        }}
        h="200px"
      >
        <Box
          w="100%"
          h="100%"
          p={4}
          borderRadius="15px"
          _hover={{
            backdropFilter: "brightness(15%)",
          }}
        >
          <Box
            w="70%"
            h="70%"
            bgColor="white"
            borderRadius="50%"
            mx="auto"
            bgImage={`url(${strCategoryThumb})`}
            bgSize="cover"
            bgPosition="center"
            mb={2}
          />

          <Text textAlign="center" fontSize="lg" fontWeight="500">
            {strCategory}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryCardLarge;