import React from "react";
import "../scss/FaceDetection.scss";

const FaceDetection = ({ currentUser }) => {
  return (
    <div className="face-detection__container">
      <div>{currentUser.name}, amount of faces you have detected so far is...</div>
      <div className="face-detection__amount">{currentUser.entries || 0}</div>
    </div>
  );
};

export default FaceDetection;
