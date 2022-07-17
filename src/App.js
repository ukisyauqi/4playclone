import { Navbar } from "./Components";
import { Box } from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AppContext } from "./context";

function App() {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/home")
      navigate("/home/semua-koleksi");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Box w="100vw" overflowX="hidden">
      <Navbar />
      <Box mt="50px">
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
