import { useData } from "../Context";
import { Video } from "../Components";
export const History = () => {
  const { state } = useData();
  return (
    <div>
      <h2>History Page</h2>
      <ul className="video-list">
        {state.history.map((item) => (
          <Video key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};
