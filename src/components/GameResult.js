import React from "react";

function GameResult({ username, secondsTaken }) {
  return (
    <div className="game-result">
      <div className="result-content">
        <div className="result-header">Good Job {username}</div>
        <div className="stat-container">
          You Took {secondsTaken} Seconds to Complete
        </div>
        <div className="btn-div">
          <button className="leaderboard">Leaderboard</button>
          <button className="new-game">New Game</button>
        </div>
      </div>
    </div>
  );
}

export default GameResult;
