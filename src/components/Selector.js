import React, { useState } from "react";

const options = ["waldo", "odlaw", "woof"];

function Selector(props) {
  const [selectorClass, setSelectorClass] = useState(
    "selector-content hidden-selector"
  );
  const [cords, setCords] = useState({ x: 0, y: 0 });
  const { makeMove } = props;

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

  function selectOption(e) {
    const name = e.target.getAttribute("data-value");
    makeMove(cords["x"], cords["y"], name);
  }

  return (
    <div className="selector-modal" onClick={handleClick}>
      <div className={selectorClass} style={selectorStyle}>
        <div className="highlight"></div>
        <div className="options">
          {/* Loop through the options array and render each option to the dom */}
          {options.map((option, index) => {
            return (
              <div
                className="option"
                data-value={option}
                onClick={selectOption}
                key={index}
              >
                {option}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Selector;
