import React from "react";
import "../scss/FaceRecognitionBox.scss";

const FaceRecognitionBox = ({ imgUrl, box }) => {
  return (
    <div className="face-box__container">
      <div style={{ position: "absolute" }}>
        <img id="inputImage" src={imgUrl} />
        <div
          className="bounding-box"
          style={{
            top: box.top,
            right: box.right,
            bottom: box.bottom,
            left: box.left,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognitionBox;
