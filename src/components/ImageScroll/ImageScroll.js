import React from "react";
import "./ImageScroll.scss";

function ImageScroll(props) {
  return (
    <div id="imageScrollDiv">
      {props.imgArr.length > 0 &&
        props.imgArr.map((url, i) => {
          return <img src={url} key={`countryPhoto${i}`} alt={`country${i}`} />;
        })}
    </div>
  );
}

export default ImageScroll;
