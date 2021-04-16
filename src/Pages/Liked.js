import { useData } from "../Context";
import { Video } from "../Components";
export const Liked = () => {
  const { state } = useData();
  return (
    <div>
      <h2>Liked Videos</h2>
      <ul className="video-list">
        {state.liked.map((item) => (
          <Video key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};
