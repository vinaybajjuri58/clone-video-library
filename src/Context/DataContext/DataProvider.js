import { useContext, useReducer, useState } from "react";
import { DataContext } from "./DataContext";
import { ReducerFunction } from "./ReducerFunction";
// import { data } from "./Data";
export const initialState = {
  videos: [],
  categories: [],
  playlists: [
    {
      id: 123,
      name: "Watch Later",
      videos: ["8egWflM1xok"],
    },
    {
      id: 124,
      name: "Wealth creation",
      videos: [],
    },
  ],
  liked: [],
  history: [],
};
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ReducerFunction, initialState);
  const [snackBarContent, setSnackBarContent] = useState("");
  const [displaySnackBar, setDisplaySnackBar] = useState(false);
  const removeSnackBar = () => {
    setDisplaySnackBar(false);
  };
  const showSnackBar = () => {
    setDisplaySnackBar(true);
  };
  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        displaySnackBar,
        snackBarContent,
        removeSnackBar,
        showSnackBar,
        setSnackBarContent,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
