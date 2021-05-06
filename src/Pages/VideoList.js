import { useData, ActionTypes, useAuth } from "../Context";
import { Video } from "../Components";
import { useEffect } from "react";
export const VideoList = () => {
  const { state, dispatch } = useData();
  const {
    authState: { isLoggedIn },
  } = useAuth();
  useEffect(() => {
    document.title = "Home | Learn Finance";
  }, []);
  const videoClickHandler = (item) => {
    if (isLoggedIn) {
      dispatch({
        type: ActionTypes.ADD_TO_HISTORY,
        payload: item,
      });
    }
  };
  return (
    <div>
      <ul className="video-list">
        {state.videos.map((item) => (
          <div key={item.id} onClick={() => videoClickHandler(item)}>
            <Video video={item} />
          </div>
        ))}
      </ul>
    </div>
  );
};
