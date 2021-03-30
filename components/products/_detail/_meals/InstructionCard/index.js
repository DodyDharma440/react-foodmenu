import React from "react";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Divider,
  HStack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { CgBowl } from "react-icons/cg";

const InstructionCard = ({ instructions, tags }) => {
  return (
    <Box bg="white" w="100%" p={4} borderRadius="15px">
      <Flex alignItems="center">
        <Heading fontFamily="body" as="h5" fontSize="2xl">
          Instructions
        </Heading>
        <Spacer />
        <Box bg="secondary.main" p={2} borderRadius="50%">
          <Text fontSize="xl">
            <CgBowl />
          </Text>
        </Box>
      </Flex>
      <Divider my={2} />
      <Box mb={4}>
        <Text fontSize="md">{instructions}</Text>
      </Box>
      {tags !== null && (
        <HStack>
          <Text fontSize="sm">Tags: </Text>
          {tags.map((tag, index) => {
            return (
              <>
                <Tag
                  size="sm"
                  variant="solid"
                  bg="primary.main"
                  key={index}
                  color="gray.800"
                >
                  {tag}
                </Tag>
              </>
            );
          })}
        </HStack>
      )}
    </Box>
  );
};

export default InstructionCard;
