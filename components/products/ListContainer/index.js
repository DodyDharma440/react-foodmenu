import React from "react";
import {
  Heading,
  Text,
  Grid,
  Flex,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";

const MenuList = ({ children, title }) => {
  const gridTemplateColumns = useBreakpointValue({
    base: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
    lg: "repeat(5, 1fr)",
    "2xl": "repeat(6, 1fr)",
  });

  return (
    <Box mb={8}>
      <Flex>
        <Heading flex="1" as="h3" fontSize="xl" fontFamily="body" mb={4}>
          {title ? title : "Title"}
        </Heading>
        <Text
          fontWeight="bold"
          transition="all 0.5s"
          cursor="pointer"
          _hover={{
            color: "secondary.main",
          }}
        >
          More...
        </Text>
      </Flex>

      <Grid templateColumns={gridTemplateColumns} gap={4}>
        {children}
      </Grid>
    </Box>
  );
};

export default MenuList;
