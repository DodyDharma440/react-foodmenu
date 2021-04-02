import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Text, Flex } from "@chakra-ui/react";

const MobileNavbar = ({ menuItems }) => {
  const router = useRouter();
  const arrayPathname = router.pathname.split("/");

  return (
    <Box
      position="fixed"
      bottom="0px"
      left="0px"
      right="0px"
      zIndex="1000"
      bgColor="white"
      boxShadow="0px 0px 7px 0px #8b8b8b"
      p={2}
    >
      <Flex>
        {menuItems.map((item, index) => {
          return (
            <Link key={index} href={item.path}>
              <Box
                p={2}
                w={`calc(100% / ${menuItems.length})`}
                fontSize="xl"
                borderRadius="15px"
                bg={
                  arrayPathname[1] === item.path.slice(1)
                    ? "primary.main"
                    : "transparent"
                }
              >
                {item.icon}
              </Box>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
};

export default MobileNavbar;
