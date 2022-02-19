import React, { useState } from "react";

function SetUser(props) {
  const [username, setUsername] = useState("");

  function updateUsername(e) {
    setUsername(e.target.value);
  }

  return (
    <div className="set-user">
      <div className="content">
        <p>You will be timed when you click start</p>
        <label htmlFor="user-name">Username: </label>
        <br></br>
        <input type="text" id="user-name" onChange={updateUsername}></input>
        <br></br>
        <button
          className="start-btn"
          onClick={(e) => props.timeUser(e, username)}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default SetUser;
