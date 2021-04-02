import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  HStack,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";

const Header = ({ title }) => {
  const [mounted, setMounted] = useState(false);
  const [greetings, setGreetings] = useState(undefined);

  const makeGreetings = () => {
    const date = new Date();
    const hour = date.getHours();

    if (hour > 0 && hour <= 10) {
      setGreetings("Morning");
    } else if (hour >= 11 && hour <= 16) {
      setGreetings("Afternoon");
    } else if (hour >= 17 && hour <= 20) {
      setGreetings("Evening");
    } else if (hour >= 21 && hour <= 24) {
      setGreetings("Night");
    }
  };

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      makeGreetings();
    }

    return () => setMounted(false);
  });

  return (
    <Box>
      <Heading as="h2" size="lg" fontFamily="body" mb={1}>
        {title === undefined ? (
          <HStack>
            <Text color="primary.main">Good</Text> <Text>{greetings}</Text>
          </HStack>
        ) : (
          <>
            <span>{title}</span>
          </>
        )}
      </Heading>
      {useBreakpointValue({
        base: <Divider borderColor="secondary.main" borderWidth="1px" />,
        lg: <></>,
      })}
    </Box>
  );
};

export default Header;
