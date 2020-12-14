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

  const loginFn = (e) => {
    e.preventDefault();

    const email = e.currentTarget.loginEmail.value;
    const password = e.currentTarget.loginPassword.value;

    console.log(`Email: ${email} Password: ${password}`);
  };

  const registerFn = (e) => {
    e.preventDefault();

    const displayName = e.currentTarget.displayName.value;
    const email = e.currentTarget.registerEmail.value;
    const password = e.currentTarget.registerPassword.value;
    const confirmPassword = e.currentTarget.registerConfirmPassword.value;

    console.log(`Email: ${email} Password: ${password}`);

    if (password !== confirmPassword) {
      console.log("Wrong password");
    }
  };

  if (loading) return null;

  return (
    <div className="App">
      <Router>
        <Header loggedIn={loggedIn} />
        <Route exact path="/">
          {loggedIn ? <HomePage /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/login">
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
            <LoginPage loginFn={loginFn} registerFn={registerFn} />
          )}
        </Route>
      </Router>
    </div>
  );
}

export default App;
