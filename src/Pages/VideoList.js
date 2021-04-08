import { useData } from "../Context";
import { Link } from "react-router-dom";
export const VideoList = () => {
  const { state } = useData();
  return (
    <div>
      <h2>List of All Videos</h2>
      {state.videos.map((item) => {
        return (
          <div id={item.id}>
            <Link to={`/video/${item.id}`}>
              <img
                width="30%"
                height="30%"
                src={item.imageUrl}
                alt={item.name}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
