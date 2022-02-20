import React, { useState } from "react";

function SetUser({ timeUser, toggleLeaderboard }) {
  const [username, setUsername] = useState("");
  const [contentStyle, setContentStyle] = useState({});

  function updateUsername(e) {
    setUsername(e.target.value);
  }

  function hanldeUser(e) {
    if (username === "") return;
    setContentStyle({ pointerEvents: "none" });
    e.target.textContent = "Loading";
    timeUser(username);
  }

  return (
    <div className="set-user">
      <div className="content" style={contentStyle}>
        <p>You will be timed when you click start</p>
        <label htmlFor="user-name">Username: </label>
        <br></br>
        <input type="text" id="user-name" onChange={updateUsername}></input>
        <br></br>
        <button className="start-btn" onClick={hanldeUser}>
          Start
        </button>
        <button className="show-leaderboard" onClick={toggleLeaderboard}>
          Leaderboard
        </button>
      </div>
    </div>
  );
}

export default SetUser;
