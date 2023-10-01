import React from "react";
import "./FaceRecognition.css"

const FaceRecognition = ({ imageURL, boxes }) => {
  return (
    <div className="center ma">
      <div className="absolute mt4">
        <img id="inputImage" src={imageURL} alt="" width='500px' height='auto'></img>
        {boxes.map((box, index) => (
        <div
            key={index}
            className="bounding-box"
            style={{
            top: `${box.topRow}px`,
            left: `${box.leftCol}px`,
            right: `${box.rightCol}px`,
            bottom: `${box.bottomRow}px`,
            }}
        />
        ))}
      </div>
    </div>
  );
}

export default FaceRecognition;
