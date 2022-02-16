import React, { useState } from "react";

function Selector(props) {
  const [selectorClass, setSelectorClass] = useState(
    "selector-content hidden-selector"
  );
  const [cords, setCords] = useState({ x: 0, y: 0 });
  const { checkPosition } = props;

  function updateCords(e) {
    const [userX, userY] = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
    setCords({ x: userX, y: userY });
  }

  const selectorStyle = {
    left: cords["x"] - 40,
    top: cords["y"] - 40,
  };

  function handleClick(e) {
    // If the selector is already visible then hide it
    if (!selectorClass.includes("hidden-selector")) {
      setSelectorClass("selector-content hidden-selector");
      return;
    }

    // Else show show the selector at the clicked position
    setSelectorClass("selector-content");
    updateCords(e);
  }

  function handlePosition(e) {
    checkPosition(cords["x"], cords["y"], e.target.getAttribute("data-value"));
  }

  return (
    <div className="selector-modal" onClick={handleClick}>
      <div className={selectorClass} style={selectorStyle}>
        <div className="highlight"></div>
        <div className="options">
          <div className="option" data-value="waldo" onClick={handlePosition}>
            Waldo
          </div>
          <div className="option" data-value="odlaw" onClick={handlePosition}>
            Odlaw
          </div>
        </div>
      </div>
    </div>
  );
}

export default Selector;
