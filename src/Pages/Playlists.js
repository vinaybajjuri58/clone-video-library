import { useData } from "../Context";
import { useEffect } from "react";
import { Playlist } from "../Components";
export const Playlists = () => {
  useEffect(() => {
    document.title = "Playlists | Learn Finance";
  }, []);
  const {
    state: { playlists },
  } = useData();
  if (playlists.length > 0) {
    return (
      <div>
        <h2>All Playlists</h2>
        <ul className="video-list">
          {playlists.map((playlist) => (
            <Playlist key={playlist.id} playlist={playlist} />
          ))}
        </ul>
      </div>
    );
  } else {
    return <h2>No playlists exist</h2>;
  }
};
