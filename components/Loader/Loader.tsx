import React from "react";
import "./Loader.css"; // Add styles here

const Loader = () => {
  return (
    <div className="three-dot-spinner">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default Loader;
