import { Link } from "react-router-dom";
export const Video = ({ video }) => {
  return (
    <div id={video.id} className="card">
      <Link to={`/video/${video.id}`}>
        <img
          style={{ flexGrow: "1" }}
          className="card-img"
          src={video.imageUrl}
          alt={video.name}
        />
      </Link>
      <div style={{ display: "flex" }}>
        <img
          className="avatar-sm"
          src={video.avatarSrc}
          alt={video.uploadedBy}
        />
        <p>{video.description}</p>
      </div>
    </div>
  );
};
