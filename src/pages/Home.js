import React, { useEffect } from "react";
import { Box, Grid } from "@chakra-ui/react";
import { HomeMain, HomeSidebar } from "../Components";
import { Outlet, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/home/semua-koleksi")
  
    return () => {
    }
  }, [])
  
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
        <Outlet/>
      </Grid>
    </Box>
  );
}
