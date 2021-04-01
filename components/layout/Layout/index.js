import React, { useState, useEffect } from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import SidebarLeft from "components/layout/SidebarLeft";

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 992) {
      setShowSidebar(true);
    } else {
      setShowSidebar(false);
    }
  }, []);

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
      {showSidebar && <SidebarLeft />}
      <Box ml={showSidebar ? "250px" : "0px"}>{children}</Box>
    </Box>
  );
};

export default Layout;
