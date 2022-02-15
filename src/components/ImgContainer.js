import React, { useState } from "react";
import Selector from "./Selector";

function ImgContainer(props) {
  const [cords, setCords] = useState({ x: 0, y: 0 });

  function logCords(e) {
    const [userX, userY] = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
    setCords({ x: userX, y: userY });
    console.log("X: ", userX);
    console.log("Y: ", userY);
  }
  return (
    <div className="img-container">
      <Selector clickHandler={logCords} cords={cords} />
      <img
        src={props.imgUrl}
        className="waldo-img"
        alt="wheres waldo img"
      ></img>
    </div>
  );
}

export default ImgContainer;
