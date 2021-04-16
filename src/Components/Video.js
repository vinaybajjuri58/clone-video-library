import { Link } from "react-router-dom";
export const Video = ({ item }) => {
  return (
    <div id={item.id} className="card">
      <Link to={`/video/${item.id}`}>
        <img
          style={{ flexGrow: "1" }}
          className="card-img"
          src={item.imageUrl}
          alt={item.name}
        />
      </Link>
      <div style={{ display: "flex" }}>
        <img className="avatar-sm" src={item.avatarSrc} alt={item.uploadedBy} />
        <p>{item.name}</p>
      </div>
    </div>
  );
};
