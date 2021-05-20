import "./App.css";
import { RoutesComponent } from "./Routes";
import { Sidebar, SnackBar } from "./Components";
import { useData, ActionTypes } from "./Context";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [loading, setLoading] = useState(false);
  const { displaySnackBar, showSnackBar, setSnackBarContent, dispatch } =
    useData();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const {
          data: { success, videos },
        } = await axios.get(
          `https://learn-finance-backend.herokuapp.com/api/videos`
        );
        if (success === true) {
          dispatch({
            type: ActionTypes.SET_VIDEOS,
            payload: videos,
          });
        }
      } catch (err) {
        setSnackBarContent("Error in getting data");
        showSnackBar(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="App">
      <Sidebar />
      {loading ? <p>Loading</p> : <RoutesComponent />}
      {displaySnackBar && <SnackBar />}
    </div>
  );
}

export default App;
