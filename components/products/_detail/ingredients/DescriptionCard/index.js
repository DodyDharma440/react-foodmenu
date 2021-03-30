import React from "react";
import { Box, Text } from "@chakra-ui/react";
import HeaderMedium from "components/common/HeaderMedium";
import { GrTextAlignLeft } from "react-icons/gr";

const DescriptionCard = ({ description }) => {
  return (
    <Box bg="white" w="100%" p={4} borderRadius="15px" boxShadow="lg">
      <HeaderMedium title="Description" icon={<GrTextAlignLeft />} />
      <Box mb={4}>
        <Text fontSize="md">{description}</Text>
      </Box>
    </Box>
  );
};

export default DescriptionCard;
