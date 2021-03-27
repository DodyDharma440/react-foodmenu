import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Image, Box, HStack, Text } from "@chakra-ui/react";
import {
  BiHomeAlt,
  BiListUl,
  BiFoodMenu,
  BiPalette,
  BiHeart,
} from "react-icons/bi";

const menuItems = [
  { path: "/", icon: <BiHomeAlt />, label: "Home" },
  { path: "/categories", icon: <BiListUl />, label: "Categories" },
  { path: "/meals", icon: <BiFoodMenu />, label: "Meals" },
  { path: "/ingredients", icon: <BiPalette />, label: "Ingredients" },
  { path: "/favourites", icon: <BiHeart />, label: "Favourites" },
];

const Sidebar = () => {
  const router = useRouter();

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
          <Link key={index} href={item.path}>
            <Box
              borderRadius="15px"
              px="16px"
              py="12px"
              mb="6px"
              transition="all 0.3s"
              _hover={{
                background: "primary.light",
                cursor: "pointer",
              }}
              bg={
                router.pathname === item.path ? "primary.main" : "transparent"
              }
            >
              <HStack>
                <Text fontSize="2xl">{item.icon}</Text>

                <Text fontSize="sm" fontWeight="bold">
                  {item.label}
                </Text>
              </HStack>
            </Box>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
