import React from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import Sidebar from "components/layout/Sidebar";

const Layout = ({ children }) => {
  const displaySidebar = useBreakpointValue({ base: "none", lg: "block" });
  const displayContent = useBreakpointValue({ base: "0", lg: "250px" });

  return (
    <Box bg="#eeeeee" minHeight="100vh" p={6}>
      <Box
        display={displaySidebar}
        position="fixed"
        w="250px"
        bg="white"
        top="0"
        bottom="0"
        left="0"
        p={4}
      >
        <Sidebar />
      </Box>
      <Box ml={displayContent}>{children}</Box>
    </Box>
  );
};

export default Layout;
