import React from "react";
import Navbar from "./components/Navbar";
import ImgContainer from "./components/ImgContainer";

import { initializeApp } from "firebase/app";
import { getFireStore, addDoc, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPAG6GIZAvNy99fj5tHtjT5tm4uLIP5U4",
  authDomain: "wheres-waldo-82794.firebaseapp.com",
  projectId: "wheres-waldo-82794",
  storageBucket: "wheres-waldo-82794.appspot.com",
  messagingSenderId: "1001571650730",
  appId: "1:1001571650730:web:d87da5dc2223f8c63314d3",
};

// Initialize Firebase
initializeApp(firebaseConfig);

function App() {
  return (
    <div>
      <Navbar />
      <ImgContainer imgUrl="./imgs/wheres-waldo-1.jpg" />
    </div>
  );
}

export default App;
