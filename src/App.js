import { Navbar } from "./Components";
import { Box } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AppContext } from "./context";

function App() {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      Object.keys(user).length !== 0 ? setUser(user) : setUser({});
    });
    navigate("/home");
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Navbar />
      <Box mt="50px">
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
