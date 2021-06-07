import React from "react";
import "../scss/FaceDetection.scss";

const FaceDetection = () => {
  return (
    <div className="face-detection__container">
      <div>Ivek, amount of faces you have detected is...</div>
      <div className="face-detection__amount">#5</div>
    </div>
  );
};

export default FaceDetection;
