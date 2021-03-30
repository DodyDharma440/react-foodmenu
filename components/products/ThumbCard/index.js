import React from "react";
import { Box, Image } from "@chakra-ui/react";

const ThumbCard = ({ image }) => {
  return (
    <Box
      w="100%"
      h="300px"
      bgImage={`url(${image})`}
      bgSize="cover"
      bgPosition="center"
      borderRadius="15px"
    >
      <Box
        w="100%"
        h="100%"
        style={{ backdropFilter: "brightness(25%)" }}
        borderRadius="15px"
        p={4}
      >
        <Image
          bgColor="white"
          src={image}
          maxHeight="100%"
          borderRadius="15px"
          boxShadow="lg"
        />
      </Box>
    </Box>
  );
};

export default ThumbCard;
