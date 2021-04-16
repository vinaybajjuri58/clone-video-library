import { useData, ActionTypes } from "../Context";
import { Video } from "../Components";
export const VideoList = () => {
  const { state, dispatch } = useData();
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
            <Video item={item} />
          </div>
        ))}
      </ul>
    </div>
  );
};
