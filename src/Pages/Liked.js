import { useData } from "../Context";
import { Video } from "../Components";
import { useDocumentTitle } from "../customHooks";
export const Liked = () => {
  useDocumentTitle("Liked | Learn Finance");
  const { state } = useData();
  if (state.liked.length > 0) {
    return (
      <div>
        <h2>Liked Videos</h2>
        <ul className="video-list">
          {state.liked.map((item) => (
            <Video key={item.videoId} video={item} />
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div>
      <h2>No liked videos</h2>
    </div>
  );
};
