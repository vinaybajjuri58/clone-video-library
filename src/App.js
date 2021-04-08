import "./App.css";
import { RoutesComponent } from "./Routes";
import { Navbar } from "./Components";

function App() {
  return (
    <div className="App">
      <Navbar />
      <RoutesComponent />
    </div>
  );
}

export default App;
