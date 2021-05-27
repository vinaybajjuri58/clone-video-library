import { useData, ActionTypes, useAuth } from "../Context";
import { Video } from "../Components";
import { useDocumentTitle } from "../customHooks";
import { addToHistory } from "./serverCalls";
export const VideoList = () => {
  const { state, dispatch } = useData();
  const {
    authState: { isLoggedIn, userToken },
  } = useAuth();
  useDocumentTitle("Home | Learn Finance");
  const videoClickHandler = async (item) => {
    if (isLoggedIn) {
      const data = await addToHistory({ videoId: item.id, token: userToken });
      if (data.success === true) {
        dispatch({
          type: ActionTypes.ADD_TO_HISTORY,
          payload: item,
        });
      }
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
