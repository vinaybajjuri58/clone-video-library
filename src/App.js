import "./App.css";
import { RoutesComponent } from "./Routes";
import { Sidebar } from "./Components";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <RoutesComponent />
    </div>
  );
}

export default App;
