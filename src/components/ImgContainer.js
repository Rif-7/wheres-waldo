import React, { useState } from "react";
import Selector from "./Selector";

const waldoPos = {
  waldo: { x: 1087, y: 85 },
  odlaw: { x: 71, y: 641 },
};

function ImgContainer(props) {
  function checkPosition(userX, userY, name) {
    const { x, y } = waldoPos[name];
    const distance = Math.sqrt((x - userX) ** 2 + (y - userY) ** 2);
    distance < 50
      ? console.log("you found", name)
      : console.log(name, "is not there");
  }

  return (
    <div className="img-container">
      <Selector checkPosition={checkPosition} />
      <img
        src={props.imgUrl}
        className="waldo-img"
        alt="wheres waldo img"
      ></img>
    </div>
  );
}

export default ImgContainer;
