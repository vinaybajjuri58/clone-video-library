import { useData } from "../Context";
import { Playlist } from "../Components";
import { useDocumentTitle } from "../customHooks";
export const Playlists = () => {
  useDocumentTitle("Playlists | Learn Finance");
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
