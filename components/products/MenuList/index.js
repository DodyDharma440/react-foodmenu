import React from "react";
import { Heading, Grid, useBreakpointValue } from "@chakra-ui/react";

const MenuList = ({ children, title }) => {
  const gridTemplateColumns = useBreakpointValue({
    base: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
    lg: "repeat(5, 1fr)",
    "2xl": "repeat(6, 1fr)",
  });

  return (
    <div>
      <Heading as="h3" fontSize="lg" fontFamily="body" mb={4}>
        {title ? title : "Title"}
      </Heading>

      <Grid templateColumns={gridTemplateColumns} gap={4}>
        {children}
      </Grid>
    </div>
  );
};

export default MenuList;
