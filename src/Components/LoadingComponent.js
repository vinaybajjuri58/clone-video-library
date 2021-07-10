import React from "react";
import ContentLoader from "react-content-loader";

export const LoadingComponent = (props) => {
  const videoArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {videoArray.map((video) => (
        <div style={{ width: "330 px", height: "340 px" }}>
          <ContentLoader
            key={video}
            viewBox="0 0 340 330"
            height={340}
            width={330}
            margin={20}
            {...props}
          >
            <circle cx="30" cy="258" r="30" />
            <rect x="75" y="233" rx="4" ry="4" width="100" height="13" />
            <rect x="75" y="260" rx="4" ry="4" width="50" height="8" />
            <rect x="0" y="210" rx="5" ry="5" width="400" height="10" />
            <rect x="0" y="0" rx="5" ry="5" width="400" height="200" />
          </ContentLoader>
        </div>
      ))}
    </div>
  );
};
