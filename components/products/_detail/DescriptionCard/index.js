import React from "react";
import { Box, Text, Center, HStack, Tag } from "@chakra-ui/react";
import HeaderMedium from "components/common/HeaderMedium";

const DescriptionCard = ({ description, title, icon, type, tags }) => {
  return (
    <Box bg="white" w="100%" p={4} borderRadius="15px" boxShadow="lg">
      <HeaderMedium title={title} icon={icon} />
      <Box mb={4}>
        {description !== null ? (
          <Text fontSize="md">{description}</Text>
        ) : (
          <Center height="100px">
            <Text color="gray.400">No description about this {type}.</Text>
          </Center>
        )}
      </Box>

      {tags !== undefined && tags !== null && (
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

export default DescriptionCard;
