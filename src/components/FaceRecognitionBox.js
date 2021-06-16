import React from "react";
import "../scss/FaceRecognitionBox.scss";

const FaceRecognitionBox = ({ imgUrl, box }) => {
  return (
    <div className="face-box__container">
      <div style={{ position: "absolute" }}>
        <img id="inputImage" src={imgUrl} />
        {Object.keys(box).length !== 0
          ? box.map((data, i) => {
              return (
                <div
                key={i}
                className="bounding-box"
                style={{
                  top: box[i].top,
                  right: box[i].right,
                  bottom: box[i].bottom,
                  left: box[i].left,
                }}
              ></div>
              )
            })
          : ""}
      </div>
    </div>
  );
};

export default FaceRecognitionBox;
