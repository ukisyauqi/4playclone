import { Navbar } from "./Components";
import { Box, useRangeSlider } from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AppContext } from "./context";

function App() {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if  (location.pathname === "/" || location.pathname === "/home") navigate("/home/semua-koleksi")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location])

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
