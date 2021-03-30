import React from "react";
import { Box, Divider, HStack, Tag, Text } from "@chakra-ui/react";
import { CgBowl } from "react-icons/cg";
import HeaderMedium from "components/common/HeaderMedium";

const InstructionCard = ({ instructions, tags }) => {
  return (
    <Box bg="white" w="100%" p={4} borderRadius="15px" boxShadow="lg">
      <HeaderMedium title="Instruction" icon={<CgBowl />} />
      <Box mb={4}>
        <Text fontSize="md">{instructions}</Text>
      </Box>
      {tags !== null && (
        <HStack>
          <Text fontSize="sm">Tags: </Text>
          {tags.map((tag, index) => {
            return (
              <div key={index}>
                <Tag
                  size="sm"
                  variant="solid"
                  bg="primary.main"
                  color="gray.800"
                >
                  {tag}
                </Tag>
              </div>
            );
          })}
        </HStack>
      )}
    </Box>
  );
};

export default InstructionCard;
