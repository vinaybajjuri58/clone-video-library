import { useDocumentTitle } from "../customHooks";
export const NotFound = () => {
  useDocumentTitle("404 Not Found");
  return (
    <div>
      <h2>Page Not Found</h2>
    </div>
  );
};
