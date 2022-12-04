import "./App.css";
import { RoutesComponent } from "./Routes";
import { Sidebar, SnackBar, LoadingComponent } from "./Components";
import { useData, ActionTypes, useAuth } from "./Context";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [loading, setLoading] = useState(false);
  const { displaySnackBar, dispatch } = useData();
  const { authState } = useAuth();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const {
          data: { success, videos },
        } = await axios.get(
          `https://learn-finance-backend.onrender.com/api/videos`
        );
        setLoading(false);
        if (success === true) {
          dispatch({
            type: ActionTypes.SET_VIDEOS,
            payload: videos,
          });
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    })();
  }, [dispatch]);
  useEffect(() => {
    if (authState.isLoggedIn === true) {
      (async () => {
        try {
          const {
            data: { success, user },
          } = await axios.get(
            `https://learn-finance-backend.onrender.com/api/users/userdata`,
            {
              headers: {
                authorization: authState.userToken,
              },
            }
          );
          if (success === true) {
            dispatch({
              type: ActionTypes.LOAD_USER_DATA,
              payload: {
                playlists: user.playlists,
                liked: user.likedVideos,
                history: user.history,
              },
            });
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [authState.isLoggedIn, dispatch, authState.userToken]);

  return (
    <div className="App">
      <Sidebar />
      {loading ? <LoadingComponent /> : <RoutesComponent />}
      {displaySnackBar && <SnackBar />}
    </div>
  );
}

export default App;
