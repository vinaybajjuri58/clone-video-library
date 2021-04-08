import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { VideoList } from "./VideoList";
export const Video = () => {
  const { videoId } = useParams();
  return (
    <div>
      <h2>Video</h2>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            position: "sticky",
            width: "70%",
          }}
        >
          <YouTube videoId={videoId} />
        </div>
        <VideoList />
      </div>
    </div>
  );
};
