import React from "react";
import "../scss/ImageLinkForm.scss";

const ImageLinkForm = ({ onChange, onSubmitImage, input }) => {
  return (
    <div className="image-link__container">
      <h1>Face Detection</h1>
      <div className="form__container">
        <div className="form__wrapper">
          <input
            className="image__input"
            type="text"
            onChange={onChange}
            value={input}
          />
          <button onClick={onSubmitImage}>Detect</button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
