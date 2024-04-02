import React, { useState } from "react";
import image from "../images/img-index.png";

const Banner = ({ src, alt, width, height, ...props }) => {
  const [failback, setFailback] = useState("");

  const handleError = () => {
    setFailback(image);
  };

  const style = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }

  return (
    <img
      src={src || ""}
      alt={alt}
      width={width}
      height={height}
      {...props}
      onError={handleError}
      style={src != null ? style : null}
    />
  );
};

export default Banner;
