import React from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { Image, Box, HStack, Text } from "@chakra-ui/react";
import {
  BiHomeAlt,
  BiListUl,
  BiFoodMenu,
  BiPalette,
  BiHeart,
} from "react-icons/bi";
import theme from "styles/theme";

const menuItemStyle = css`
  border-radius: 15px;
  padding: 12px 16px;
  &:hover {
    background: ${theme.colors.primary.light};
    cursor: pointer;
  }
  margin-bottom: 6px;
  transition: all 0.3s;
`;

const activeStyle = css`
  background: ${theme.colors.primary.main};
`;

const menuItems = [
  { path: "/", icon: <BiHomeAlt />, label: "Home" },
  { path: "/category", icon: <BiListUl />, label: "Category" },
  { path: "/meal", icon: <BiFoodMenu />, label: "Meal" },
  { path: "/ingredients", icon: <BiPalette />, label: "Ingredients" },
  { path: "/favourites", icon: <BiHeart />, label: "Favourites" },
];

const Sidebar = () => {
  const router = useRouter();

  console.log(router.pathname);

  return (
    <div>
      <Image
        height="45px"
        mx="auto"
        mb={10}
        src="assets/images/logo/logo.png"
        alt="logo"
      />
      {menuItems.map((item, index) => {
        return (
          <Box
            key={index}
            css={menuItemStyle}
            bg={router.pathname === item.path ? "primary.main" : "transparent"}
          >
            <HStack>
              <Text fontSize="2xl">{item.icon}</Text>

              <Text fontSize="sm" fontWeight="bold">
                {item.label}
              </Text>
            </HStack>
          </Box>
        );
      })}
    </div>
  );
};

export default Sidebar;
