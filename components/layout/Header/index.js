import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import styled from "@emotion/styled";
import theme from "styles/theme";

const GreetingsText = styled.span`
  color: ${theme.colors.primary.main};
`;

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
      <Heading as="h2" size="lg" fontFamily="body">
        {title === undefined ? (
          <>
            <GreetingsText>Good </GreetingsText>
            {greetings}
          </>
        ) : (
          <>
            <span>{title}</span>
          </>
        )}
      </Heading>
    </Box>
  );
};

export default Header;
