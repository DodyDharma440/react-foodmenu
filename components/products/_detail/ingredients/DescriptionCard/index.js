import React from "react";
import { Box, Text, Center } from "@chakra-ui/react";
import HeaderMedium from "components/common/HeaderMedium";
import { GrTextAlignLeft } from "react-icons/gr";

const DescriptionCard = ({ description }) => {
  return (
    <Box bg="white" w="100%" p={4} borderRadius="15px" boxShadow="lg">
      <HeaderMedium title="Description" icon={<GrTextAlignLeft />} />
      <Box mb={4}>
        {description !== null ? (
          <Text fontSize="md">{description}</Text>
        ) : (
          <Center height="100px">
            <Text color="gray.400">No description about this ingredient</Text>
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default DescriptionCard;
