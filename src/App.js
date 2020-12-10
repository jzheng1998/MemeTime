import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

import "./style/App.css";
import HomePage from "./containers/HomePage";
import Header from "./components/Header";
import LoginPage from "./containers/LoginPage";

const firebaseConfig = {
  apiKey: "AIzaSyDDCgzN8jMtWOoiJkB3Pu_JS110OE8ykdE",
  authDomain: "dynamic-web-b49a8.firebaseapp.com",
  projectId: "dynamic-web-b49a8",
  storageBucket: "dynamic-web-b49a8.appspot.com",
  messagingSenderId: "872225899077",
  appId: "1:872225899077:web:db64176ff0c96930b7992c",
};

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUserInfo(user);
      } else {
        setLoggedIn(false);
      }
    });
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <div className="App">
      <Router>
        <Header loggedIn={loggedIn} />
        <Route exact path="/">
          {loggedIn ? <HomePage /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/login">
          {loggedIn ? <Redirect to="/" /> : <LoginPage />}
        </Route>
      </Router>
    </div>
  );
}

export default App;
