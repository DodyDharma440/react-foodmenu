import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text, Flex } from "@chakra-ui/react";
import { FaYoutube } from "react-icons/fa";

const MealCard = ({ item }) => {
  const { strMeal, strMealThumb, idMeal } = item;
  const [detail, setDetail] = useState({});

  useEffect(async () => {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    await setDetail(res.data.meals[0]);
  }, []);

  return (
    <Box w="100%">
      <Box bg="white" borderRadius="10px" p={4} boxShadow="md" mb={1}>
        <Box
          bgImage={`url(${strMealThumb})`}
          bgSize="cover"
          h="120px"
          w="100%"
          borderRadius="10px"
        />
        <Flex justifyContent="flex-end" pt={1}>
          <Text
            fontSize="sm"
            fontWeight="600"
            color="secondary.main"
            isTruncated
            flex="1"
            width="100px"
          >
            {detail.strArea}
          </Text>
          <a href={detail.strYoutube} target="_blank">
            <Text
              fontSize="xl"
              transition="all 0.3s"
              _hover={{ color: "red.500", cursor: "pointer" }}
            >
              <FaYoutube />
            </Text>
          </a>
        </Flex>
      </Box>
      <Text
        w="100%"
        px={1}
        fontSize="md"
        fontWeight="500"
        transition="all 0.3s"
        _hover={{ color: "secondary.main", cursor: "pointer" }}
      >
        {strMeal}
      </Text>
    </Box>
  );
};

export default MealCard;
