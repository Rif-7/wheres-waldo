import React, { useEffect } from "react";

function GameResult({ username, secondsTaken, startNewGame }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="game-result">
      <div className="result-content">
        <div className="result-header">Good Job {username}</div>
        <div className="stat-container">
          You Took {secondsTaken} Seconds to Complete
        </div>
        <div className="btn-div">
          <button className="leaderboard">Leaderboard</button>
          <button className="new-game" onClick={startNewGame}>
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameResult;
