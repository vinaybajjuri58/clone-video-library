import { useContext, useReducer } from "react";
import { DataContext } from "./DataContext";
import { ReducerFunction } from "./ReducerFunction";
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ReducerFunction, {
    videos: [],
    categories: [],
    playlists: [],
  });
  return (
    <DataContext.Provider value={(state, dispatch)}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
