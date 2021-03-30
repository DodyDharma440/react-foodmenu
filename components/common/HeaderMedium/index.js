import React from "react";
import { Flex, Heading, Spacer, Box, Text, Divider } from "@chakra-ui/react";

const HeaderMedium = ({ title, icon }) => {
  return (
    <>
      <Flex alignItems="center">
        <Heading fontFamily="body" as="h5" fontSize="2xl">
          {title}
        </Heading>
        <Spacer />
        <Box bg="primary.main" p={2} borderRadius="50%">
          <Text fontSize="xl">{icon}</Text>
        </Box>
      </Flex>
      <Divider my={4} borderColor="gray.300" />
    </>
  );
};

export default HeaderMedium;
