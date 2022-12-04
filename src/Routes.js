import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import {
  Liked,
  Playlists,
  History,
  VideoList,
  Video,
  PlayListVideos,
  NotFound,
  Signup,
  Login,
} from "./Pages";
export const RoutesComponent = () => {
  return (
    <Routes>
      <PrivateRoute path="/history" element={<History />} />
      <PrivateRoute path="/liked" element={<Liked />} />
      <PrivateRoute path="/playlists" element={<Playlists />} />
      <Route path="/" element={<VideoList />} />
      <Route path="/video/:videoId" element={<Video />} />
      <PrivateRoute path="/playlist/:playlistId" element={<PlayListVideos />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
