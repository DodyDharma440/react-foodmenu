import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Box, Text, Stack, useBreakpointValue } from "@chakra-ui/react";
import { FaYoutube } from "react-icons/fa";

const MealCard = ({ item }) => {
  const { strMeal, strMealThumb, idMeal } = item;
  const [detail, setDetail] = useState({});

  const getDetailData = () => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then((res) => {
        setDetail(res.data.meals[0]);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getDetailData();
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
        <Stack
          pt={1}
          direction={useBreakpointValue({
            base: "column",
            sm: "row",
          })}
        >
          <Text fontSize="sm" fontWeight="600" color="secondary.main">
            {detail.strArea}
          </Text>
          <a
            href={detail.strYoutube}
            target="_blank"
            style={{
              marginLeft: useBreakpointValue({
                base: "0",
                sm: "auto",
              }),
            }}
          >
            <Text
              fontSize="xl"
              transition="all 0.3s"
              _hover={{ color: "red.500", cursor: "pointer" }}
            >
              <FaYoutube />
            </Text>
          </a>
        </Stack>
      </Box>
      <Link href={`/meals/detail/${idMeal}`}>
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
      </Link>
    </Box>
  );
};

export default MealCard;
