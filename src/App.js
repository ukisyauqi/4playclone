import { Navbar } from "./Components";
import { Box } from "@chakra-ui/react";
import Home from "./pages/Home";
import { Outlet, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { auth, firebaseConfig } from "./firebase";
import { initializeApp } from "firebase/app";
import { onAuthStateChanged } from "firebase/auth";
import { AppContext } from "./context";

function App() {
  const { setUser } = useContext(AppContext);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });

    return () => {};
  }, []);

  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  );
}

export default App;
