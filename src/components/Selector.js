import React, { useState, useEffect } from "react";

const options = ["waldo", "odlaw", "woof"];

function Selector({ makeMove, gameState }) {
  const [selectorClass, setSelectorClass] = useState(
    "selector-content hidden-selector"
  );
  const [cords, setCords] = useState({ x: 0, y: 0 });
  const [showFound, setShowFound] = useState(false);
  const [foundInfo, setFoundInfo] = useState();
  const [foundClass, setFoundClass] = useState("found-alert not-found");

  useEffect(() => {
    if (showFound) {
      setTimeout(() => setShowFound(false), 1000);
    }
  }, [showFound]);

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

  async function selectOption(e) {
    const name = e.target.getAttribute("data-value");
    const result = await makeMove(cords["x"], cords["y"], name);
    console.log(result);
    if (result) {
      setFoundInfo("You found " + name);
      setFoundClass("found-alert");
    } else {
      setFoundInfo(name + " isn't there");
      setFoundClass("found-alert not-found");
    }
    setShowFound(true);
  }

  const createStyle = (clicked) =>
    clicked ? { pointerEvents: "none", backgroundColor: "green" } : {};

  return (
    <div className="selector-modal" onClick={handleClick}>
      {showFound ? (
        <div className={foundClass} style={selectorStyle}>
          {foundInfo}
        </div>
      ) : null}
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
                // if the character has been found change it's styling
                style={createStyle(gameState[option])}
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
