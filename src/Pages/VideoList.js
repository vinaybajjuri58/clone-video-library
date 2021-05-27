import { useData, ActionTypes, useAuth } from "../Context";
import { Video } from "../Components";
import { useDocumentTitle } from "../customHooks";
export const VideoList = () => {
  const { state, dispatch } = useData();
  const {
    authState: { isLoggedIn },
  } = useAuth();
  useDocumentTitle("Home | Learn Finance");
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
        {state.videos.length > 0 &&
          state.videos.map((item) => (
            <div key={item.videoId} onClick={() => videoClickHandler(item)}>
              <Video video={item} />
            </div>
          ))}
      </ul>
    </div>
  );
};
