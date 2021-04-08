import { useContext, useReducer } from "react";
import { DataContext } from "./DataContext";
import { ReducerFunction } from "./ReducerFunction";
import { data } from "./Data";
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ReducerFunction, {
    videos: data,
    categories: [],
    playlists: [],
    liked: [],
    history: [],
  });
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
