import { Routes, Route } from "react-router-dom";
import { Liked, Playlists, History, VideoList, Video } from "./Pages";
export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/history" element={<History />} />
      <Route path="/liked" element={<Liked />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/" element={<VideoList />} />
      <Route path="/video/:videoId" element={<Video />} />
    </Routes>
  );
};
