import { useData } from "../Context";
import { useEffect } from "react";
export const Playlists = () => {
  useEffect(() => {
    document.title = "Playlists | Learn Finance";
  }, []);
  return (
    <div>
      <h2>All Playlists</h2>
      <DisplayPlaylists />
    </div>
  );
};
const DisplayPlaylists = () => {
  const {
    state: { playlists },
  } = useData();
  const noOfVideosInPlaylists = playlists.reduce((cumulative, playlist) => {
    return cumulative + playlist.videos.length;
  }, 0);
  if (noOfVideosInPlaylists > 0) {
    return (
      <ul>
        {playlists.map((playlist) => (
          <p>{playlist.name}</p>
        ))}
      </ul>
    );
  } else {
    return <h2>No videos exist in playlist</h2>;
  }
};
