import { useParams } from "react-router-dom";
export const PlayListVideos = () => {
  const { playlistId } = useParams();
  return (
    <div>
      <h2>All videos of playlist with id :{playlistId}</h2>
    </div>
  );
};
