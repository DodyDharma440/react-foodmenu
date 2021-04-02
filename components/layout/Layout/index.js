import React from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import SidebarLeft from "components/layout/SidebarLeft";
import MobileNavbar from "components/layout/MobileNavbar";
import {
  BiHomeAlt,
  BiListUl,
  BiFoodMenu,
  BiPalette,
  BiHeart,
} from "react-icons/bi";

const menuItems = [
  {
    path: "/",
    icon: <BiHomeAlt style={{ margin: "auto" }} />,
    label: "Home",
  },
  {
    path: "/categories",
    icon: <BiListUl style={{ margin: "auto" }} />,
    label: "Categories",
  },
  {
    path: "/meals",
    icon: <BiFoodMenu style={{ margin: "auto" }} />,
    label: "Meals",
  },
  {
    path: "/ingredients",
    icon: <BiPalette style={{ margin: "auto" }} />,
    label: "Ingredients",
  },
  // {
  //   path: "/favourites",
  //   icon: <BiHeart style={{ margin: "auto" }} />,
  //   label: "Favourites",
  // },
];

const Layout = ({ children }) => {
  return (
    <Box
      bg="#eeeeee"
      minHeight="100vh"
      px={6}
      pb="62px"
      pt={useBreakpointValue({
        base: 2,
        lg: 6,
      })}
    >
      {useBreakpointValue({
        base: <MobileNavbar menuItems={menuItems} />,
        lg: <SidebarLeft menuItems={menuItems} />,
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
