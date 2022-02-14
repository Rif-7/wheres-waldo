import React from "react";

function ImgContainer(props) {
  return (
    <div className="img-container">
      <img
        src={props.imgUrl}
        className="waldo-img"
        alt="wheres waldo img"
        onClick={props.clickHandler}
      ></img>
    </div>
  );
}

export default ImgContainer;
