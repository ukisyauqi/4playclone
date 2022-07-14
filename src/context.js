import { createContext, useState } from "react";

export const AppContext = createContext();
export const AppContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [mainData, setMainData] = useState([]);
  const [isFromSearch, setIsFromSearch] = useState(false)

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        mainData,
        setMainData,
        isFromSearch, setIsFromSearch
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
