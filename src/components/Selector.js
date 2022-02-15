import React from "react";

function Selector(props) {
  const { cords, clickHandler } = props;
  const selectorStyle = {
    left: cords["x"] - 40,
    top: cords["y"] - 40,
  };

  function handleClick() {}

  return (
    <div className="selector-modal" onClick={clickHandler}>
      <div className="selector-content" style={selectorStyle}>
        <div className="highlight"></div>
        <div className="options">
          <div className="option">Waldo</div>
          <div className="option">Odlaw</div>
        </div>
      </div>
    </div>
  );
}

export default Selector;
