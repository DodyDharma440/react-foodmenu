import React from "react";
import { Grid, Center, Text } from "@chakra-ui/react";
import { BiFoodMenu } from "react-icons/bi";
import HeaderMedium from "components/common/HeaderMedium";
import MealCard from "components/products/MealCard";

const MealLists = ({ title, meals }) => {
  return (
    <>
      <HeaderMedium title={`Meals With ${title}`} icon={<BiFoodMenu />} />
      {meals !== null ? (
        <Grid templateColumns="repeat(2, 1fr)" gap={3}>
          {meals.map((meal, index) => {
            return <MealCard key={index} item={meal} />;
          })}
        </Grid>
      ) : (
        <Center>
          <Text color="gray.400">No meals with this ingredient.</Text>
        </Center>
      )}
    </>
  );
};

export default MealLists;
