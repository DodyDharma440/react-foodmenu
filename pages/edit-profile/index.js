import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Stack, useBreakpointValue } from "@chakra-ui/react";
import { ProfileCard, FormEditProfile } from "components/user";

const EditProfile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (!userData) {
      setUserData(JSON.parse(localStorage.getItem("user-data")));
    }

    if (!userData?.isLoggedIn) {
      router.push("/auth");
    }
  }, [userData]);

  return (
    <>
      <Head>
        <title>FooDY | Edit Profile</title>
      </Head>

      <Stack
        spacing={6}
        alignItems="flex-start"
        direction={useBreakpointValue({
          base: "column",
          md: "row"
        })}>
        <ProfileCard
          w={useBreakpointValue({
            base: "100%",
            md: "35%"
          })}
        />
        <FormEditProfile
          w={useBreakpointValue({
            base: "100%",
            md: "65%"
          })}
        />
      </Stack>
    </>
  );
};

export default EditProfile;
