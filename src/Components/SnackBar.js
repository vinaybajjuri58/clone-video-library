import { useEffect } from "react";
import { useData } from "../Context";
export const SnackBar = () => {
  const { snackBarContent, removeSnackBar } = useData();
  useEffect(() => {
    setTimeout(() => {
      removeSnackBar();
    }, 2500);
  }, [snackBarContent, removeSnackBar]);
  return (
    <div className="snackbar snackbar-display">
      <p>{snackBarContent}</p>
    </div>
  );
};
