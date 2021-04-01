import React from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import SidebarLeft from "components/layout/SidebarLeft";

const Layout = ({ children }) => {
  return (
    <Box
      bg="#eeeeee"
      minHeight="100vh"
      px={6}
      py={useBreakpointValue({
        base: 2,
        lg: 6,
      })}
    >
      {useBreakpointValue({
        lg: <SidebarLeft />,
      })}

      <Box
        ml={useBreakpointValue({
          base: "0px",
          lg: "250px",
        })}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
