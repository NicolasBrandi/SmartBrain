import React from "react";

const FaceRecognition = ({imageURL}) => {
    return (
        <div className="center ma">
            <div className="absolute mt4">
            <img src={imageURL} alt="" width='500px' height='auto'></img>

            </div>
        </div>
    )
}

export default FaceRecognition;