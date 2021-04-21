import "./App.css";
import { RoutesComponent } from "./Routes";
import { Sidebar, SnackBar } from "./Components";
import { useEffect } from "react";
import { useData } from "./Context";

function App() {
  useEffect(() => {
    document.title = "Learn Finance";
  }, []);
  const { displaySnackBar } = useData();
  return (
    <div className="App">
      <Sidebar />
      <RoutesComponent />
      {displaySnackBar && <SnackBar />}
    </div>
  );
}

export default App;
