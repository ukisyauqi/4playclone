import React from "react";
import { Box, Grid } from "@chakra-ui/react";
import { HomeMain, HomeSidebar } from "../Components";

export default function Home() {
  return (
    <Box>
      <Grid
        m="auto"
        w="1050px"
        templateColumns="200px auto"
        gap="30px"
        minH="100vh"
        mt="30px"
      >
        <HomeSidebar />
        <HomeMain />
      </Grid>
    </Box>
  );
}
