import React, { useEffect } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { HomeSidebar, NewCollectionModal } from "../Components";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export default function Home() {
  return (
    <Box>
      <Grid
        m="auto"
        maxW="1050px"
        templateColumns="200px auto"
        gap="30px"
        minH="100vh"
        mt="70px"
      >
        <GridItem colSpan={[0, 0, 1]} pl="30px">
        <Box display={["none", "none", "block"]}>
          <HomeSidebar />
          </Box>
        </GridItem>
        <GridItem
          colSpan={[2, 2, 1]}
          pb="30vh"
          px={["0px", "20px", null]}
        >
          <Outlet />
        </GridItem>
      </Grid>
    </Box>
  );
}
