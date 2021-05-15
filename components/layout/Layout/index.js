import React from "react";
import { Box, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import SidebarContent from "components/layout/SidebarContent";
import MobileNavbar from "components/layout/MobileNavbar";
import {
  BiHomeAlt,
  BiListUl,
  BiFoodMenu,
  BiPalette,
  BiHeart
} from "react-icons/bi";

const menuItems = [
  {
    path: "/",
    icon: <BiHomeAlt style={{ margin: "auto" }} />,
    label: "Home"
  },
  {
    path: "/categories",
    icon: <BiListUl style={{ margin: "auto" }} />,
    label: "Categories"
  },
  {
    path: "/meals",
    icon: <BiFoodMenu style={{ margin: "auto" }} />,
    label: "Meals"
  },
  {
    path: "/ingredients",
    icon: <BiPalette style={{ margin: "auto" }} />,
    label: "Ingredients"
  }
  // {
  //   path: "/favourites",
  //   icon: <BiHeart style={{ margin: "auto" }} />,
  //   label: "Favourites"
  // }
];

const Layout = ({ children }) => {
  return (
    <Box
      bg={useColorModeValue("mainBackground", "gray.700")}
      minHeight="100vh"
      px={useBreakpointValue({
        base: 3,
        lg: 6
      })}
      pt={useBreakpointValue({
        base: "62px",
        lg: 6
      })}
      pb={useBreakpointValue({
        base: 4,
        lg: 6
      })}>
      {useBreakpointValue({
        base: <MobileNavbar menuItems={menuItems} />,
        lg: (
          <Box
            position="fixed"
            w="250px"
            bg={useColorModeValue("white", "gray.800")}
            top="0"
            bottom="0"
            left="0"
            p={4}
            overflow="auto"
            display="flex"
            flexDirection="column">
            <SidebarContent menuItems={menuItems} />
          </Box>
        )
      })}

      <Box
        ml={useBreakpointValue({
          base: "0px",
          lg: "250px"
        })}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
