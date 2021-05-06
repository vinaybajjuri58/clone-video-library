import "./App.css";
import { RoutesComponent } from "./Routes";
import { Sidebar, SnackBar } from "./Components";
import { useData } from "./Context";

function App() {
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
