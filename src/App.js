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

// Initialize Firebase

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

  console.log(userId);
  return (
    <div>
      <Navbar />
      {showSetUp ? <SetUser timeUser={timeUser} /> : null}
      <ImgContainer imgUrl="./imgs/wheres-waldo-1.jpg" />
    </div>
  );
}

export default App;
