import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Post from "./pages/Post";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import { AppContextProvider } from "./context";
import { HomeMain } from "./Components";
import ProfileSettings from "./pages/ProfileSettings";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="home" element={<Home />}>
                <Route path=":tag" element={<HomeMain />} />
              </Route>
              <Route path="post/:title" element={<Post />} />
              <Route path="settings" element={<ProfileSettings />}/>
            </Route>
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </AppContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
