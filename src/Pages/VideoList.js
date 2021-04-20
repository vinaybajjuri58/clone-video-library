import { useData, ActionTypes } from "../Context";
import { Video } from "../Components";
import { useEffect } from "react";
export const VideoList = () => {
  const { state, dispatch } = useData();
  useEffect(() => {
    document.title = "Home | Learn Finance";
  }, []);
  return (
    <div>
      <ul className="video-list">
        {state.videos.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              dispatch({
                type: ActionTypes.ADD_TO_HISTORY,
                payload: item,
              });
            }}
          >
            <Video video={item} />
          </div>
        ))}
      </ul>
    </div>
  );
};
