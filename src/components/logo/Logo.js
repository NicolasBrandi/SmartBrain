import React from "react";
import { Tilt } from "react-tilt";
import Brain from "./brain.png"
import "./Logo.css";


const Logo = () => {
  return (
    <div className="ma4 mt0" >
      <Tilt className="Tilt br2 shadow-3" options={{max:60}} >
        <div className="Tilt-inner p3">
            <img style={{paddingTop: "18px"}} src={Brain} alt="logo"></img>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
