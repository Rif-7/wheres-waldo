import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ImgContainer from "./components/ImgContainer";
import SetUser from "./components/SetUser";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
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
  const [showSetUp, setShowSetUp] = useState(true);

  useEffect(() => {
    if (userId === "") {
      setShowSetUp(true);
      return;
    }
    setShowSetUp(false);
  }, [userId]);

  function setEndTime() {
    const userRef = doc(db, "timing", userId);
    updateDoc(userRef, {
      endTime: serverTimestamp(),
    })
      .then(() => console.log("timer ended"))
      .catch((err) => console.log(err));
  }

  function timeUser(username) {
    if (!username) return;
    addDoc(collection(db, "timing"), {
      username: username,
      startTime: serverTimestamp(),
      endTime: "",
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
  }

  return (
    <div className="container">
      <Navbar />
      {showSetUp ? <SetUser timeUser={timeUser} /> : null}
      <ImgContainer
        imgUrl="./imgs/wheres-waldo-1.jpg"
        checkPosition={checkPosition}
      />
    </div>
  );
}

export default App;
