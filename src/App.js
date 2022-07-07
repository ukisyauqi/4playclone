import { Navbar } from "./Components";
import { Box } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AppContext } from "./context";

function App() {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });
    navigate("/home")
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
