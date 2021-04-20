import "./App.css";
import { RoutesComponent } from "./Routes";
import { Sidebar } from "./Components";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Learn Finance";
  }, []);
  return (
    <div className="App">
      <Sidebar />
      <RoutesComponent />
    </div>
  );
}

export default App;
