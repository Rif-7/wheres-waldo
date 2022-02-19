import React from "react";
import Selector from "./Selector";

function ImgContainer(props) {
  const { makeMove } = props;

  return (
    <div className="img-container">
      <Selector makeMove={makeMove} />
      <img
        src={props.imgUrl}
        className="waldo-img"
        alt="wheres waldo img"
      ></img>
    </div>
  );
}

export default ImgContainer;
