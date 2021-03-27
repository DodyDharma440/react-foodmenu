import React from "react";
import { Box } from "@chakra-ui/react";
import Sidebar from "components/layout/Sidebar";

const Layout = ({ children }) => {
  return (
    <Box bg="#eeeeee" minHeight="100vh" p={6}>
      <Box
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
      <Box ml="250px">{children}</Box>
    </Box>
  );
};

export default Layout;
