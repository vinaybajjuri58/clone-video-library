import { ActionTypes, useData } from "../Context";
import { Video } from "../Components";
import { useEffect } from "react";
export const History = () => {
  const { state, dispatch, showSnackBar, setSnackBarContent } = useData();
  useEffect(() => {
    document.title = "History | Learn Finance";
  }, []);
  if (state.history.length > 0) {
    return (
      <div>
        <h2>History Page</h2>
        <button
          className="icon-button card-remove button-style"
          onClick={() => {
            setSnackBarContent(`Cleared History`);
            showSnackBar();
            dispatch({
              type: ActionTypes.CLEAR_HISTORY,
            });
          }}
        >
          <i className="fas fa-trash"></i>CLEAR HISTORY
        </button>
        <ul className="video-list">
          {state.history.map((item) => (
            <Video key={item.id} video={item} removeFromHistory />
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div>
      <h2>You havent watched any video yet</h2>
    </div>
  );
};
