import React from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import SidebarLeft from "components/layout/SidebarLeft";

const Layout = ({ children }) => {
  const DisplaySidebar = () => {
    return (
      <>
        {useBreakpointValue({
          base: <></>,
          lg: <SidebarLeft />,
        })}
      </>
    );
  };

  const DisplayContent = () => {
    return (
      <>
        {useBreakpointValue({
          base: <Box>{children}</Box>,
          lg: <Box ml="250px">{children}</Box>,
        })}
      </>
    );
  };

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
      <DisplaySidebar />
      <DisplayContent />
    </Box>
  );
};

export default Layout;
