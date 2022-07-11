import { createContext, useState } from "react";

export const AppContext = createContext();
export const AppContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [mainData, setMainData] = useState([]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        mainData,
        setMainData,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
