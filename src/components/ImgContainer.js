import React from "react";
import Selector from "./Selector";

function ImgContainer({ makeMove, gameStarted, gameState, imgUrl }) {
  const style = gameStarted ? {} : { pointerEvents: "none" };

  return (
    <div className="img-container" style={style}>
      <Selector makeMove={makeMove} gameState={gameState} />
      <img src={imgUrl} className="waldo-img" alt="wheres waldo img"></img>
    </div>
  );
}

export default ImgContainer;
