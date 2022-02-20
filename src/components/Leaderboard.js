import React, { useEffect, useState } from "react";

function Leaderboard({ getLeaderboard, startNewGame }) {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [boardStatus, setBoardStatus] = useState("Loading...");
  useEffect(async () => {
    const data = await getLeaderboard();
    if (data.length === 0) setBoardStatus("Leaderboard empty :(");
    setLeaderboardData(data);
  }, []);
  return (
    <div className="leaderboard">
      <div className="leaderboard-content">
        <div className="top">
          <div className="header">Leaderboard</div>
          <button className="close-btn" onClick={startNewGame}>
            Close
          </button>
        </div>
        {!leaderboardData.length ? <h1>{boardStatus}</h1> : null}
        {leaderboardData.map((data, index) => {
          return (
            <div className="leaderboard-item" key={index}>
              <div>
                <span className="rank">{index + 1})</span> {data.username}
              </div>
              <div>{data.timeTaken}s</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Leaderboard;
