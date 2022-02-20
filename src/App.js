import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ImgContainer from "./components/ImgContainer";
import SetUser from "./components/SetUser";
import GameResult from "./components/GameResult";
import Leaderboard from "./components/Leaderboard";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPAG6GIZAvNy99fj5tHtjT5tm4uLIP5U4",
  authDomain: "wheres-waldo-82794.firebaseapp.com",
  projectId: "wheres-waldo-82794",
  storageBucket: "wheres-waldo-82794.appspot.com",
  messagingSenderId: "1001571650730",
  appId: "1:1001571650730:web:d87da5dc2223f8c63314d3",
};

initializeApp(firebaseConfig);

const db = getFirestore();

const waldoPos = {
  woof: "4mX9Cb18EFXZQg9OHja4",
  odlaw: "DQ77QmuGzTN8U2Gqffqg",
  waldo: "LFemWDS9Z2V5JodNM2JR",
};

function App() {
  const [userId, setUserId] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [showSetUp, setShowSetUp] = useState(true);
  const [gameResult, setGameResult] = useState();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [gameState, setGameState] = useState({
    waldo: false,
    odlaw: false,
    woof: false,
  });

  useEffect(() => {
    if (userId === "") {
      setGameStarted(false);
      return;
    }
    setGameStarted(true);
    setShowSetUp(false);
  }, [userId]);

  useEffect(async () => {
    // checks if every item of the gameState is set to true
    const isGameFinished = Object.keys(gameState).every(
      (key) => gameState[key]
    );
    if (isGameFinished) {
      setGameStarted(false);
      console.log("game finished");
      await setEndTime();
      endGame();
    }
  }, [gameState]);

  async function setEndTime() {
    const userRef = doc(db, "timing", userId);
    await updateDoc(userRef, {
      endTime: serverTimestamp(),
    })
      .then(() => console.log("timer ended"))
      .catch((err) => console.log(err));
  }

  function timeUser(username) {
    addDoc(collection(db, "timing"), {
      username: username,
      startTime: serverTimestamp(),
      endTime: false,
    })
      .then((res) => {
        setUserId(res.id);
        console.log("user timed");
      })
      .catch((err) => console.log(err));
  }

  async function checkPosition(userX, userY, name) {
    const charId = waldoPos[name];
    const charRef = doc(db, "locations", charId);
    const charSnap = await getDoc(charRef);
    const [x, y] = [charSnap.data()["x-cord"], charSnap.data()["y-cord"]];
    const distance = Math.sqrt((x - userX) ** 2 + (y - userY) ** 2);
    distance < 30
      ? console.log("you found", name)
      : console.log(name, "is not there");
    return distance < 30;
  }

  async function makeMove(userX, userY, name) {
    if (userId === "") return;
    const result = await checkPosition(userX, userY, name);
    if (result) {
      const newGameState = Object.assign({}, gameState);
      newGameState[name] = true;
      setGameState(newGameState);
    }
  }

  async function endGame() {
    const userRef = doc(db, "timing", userId);
    const userDoc = await getDoc(userRef).then((res) => res.data());
    const { startTime, endTime, username } = userDoc;
    const secondsTaken = Math.round(endTime - startTime);
    setGameResult({ username, secondsTaken });
    console.log(secondsTaken, "seconds to complete");
  }

  function startNewGame() {
    setUserId("");
    setGameResult();
    setShowSetUp(true);
    setShowLeaderboard(false);
    setGameState({
      waldo: false,
      odlaw: false,
      woof: false,
    });
  }

  async function getLeaderboard() {
    const resultRef = query(
      collection(db, "timing"),
      where("endTime", "!=", false)
    );
    const resultDocs = await getDocs(resultRef);
    const results = [];
    resultDocs.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const { username, startTime, endTime } = doc.data();
      results.push({ username, timeTaken: (endTime - startTime).toFixed(2) });
    });
    // sorts the array from lowest to largest based on the time taken
    const sortedArray = results.sort((a, b) => a.timeTaken - b.timeTaken);
    return sortedArray;
  }

  function toggleLeaderboard() {
    setShowLeaderboard(true);
    setShowSetUp(false);
  }

  return (
    <div className="container">
      <Navbar />

      {showSetUp ? (
        <SetUser timeUser={timeUser} toggleLeaderboard={toggleLeaderboard} />
      ) : null}

      {!gameStarted && !showSetUp && !showLeaderboard ? (
        <GameResult
          {...gameResult}
          startNewGame={startNewGame}
          toggleLeaderboard={toggleLeaderboard}
        />
      ) : null}

      {showLeaderboard ? (
        <Leaderboard
          getLeaderboard={getLeaderboard}
          startNewGame={startNewGame}
        />
      ) : null}

      <ImgContainer
        imgUrl="./imgs/wheres-waldo-1.jpg"
        makeMove={makeMove}
        gameStarted={gameStarted}
        gameState={gameState}
      />
    </div>
  );
}

export default App;
