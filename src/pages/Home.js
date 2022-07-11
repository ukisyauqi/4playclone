import React, { useEffect } from "react";
import { Box, Grid } from "@chakra-ui/react";
import {  HomeSidebar } from "../Components";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    if (!params.docId) navigate("/home/semua-koleksi");
    return () => {};
  }, []);

  return (
    <Box>
      <Grid
        m="auto"
        w="1050px"
        templateColumns="200px auto"
        gap="30px"
        minH="100vh"
        mt="70px"
      >
        <HomeSidebar />
        <Outlet />
      </Grid>
    </Box>
  );
}
