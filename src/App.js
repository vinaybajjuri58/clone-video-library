import "./App.css";
import { RoutesComponent } from "./Routes";
import { Sidebar, SnackBar } from "./Components";
import { useData } from "./Context";
import { Navbar } from "./Components/Navbar";

function App() {
  const { displaySnackBar } = useData();
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <RoutesComponent />
      {displaySnackBar && <SnackBar />}
    </div>
  );
}

export default App;
