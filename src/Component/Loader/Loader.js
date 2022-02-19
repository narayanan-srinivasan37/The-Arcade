import React from "react";
import "./Loader.css";
import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loading-div ">
      <Triangle
        height={300}
        width={300}
        color={"red"}
        wrapperClass="loaderWrapper"
        ariaLabel="loading-indicator"
      >
        <p>Arcade</p>
      </Triangle>
    </div>
  );
};

export default Loader;
