import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import firebase from "firebase/app";
import "firebase/auth";

import "./style/App.css";
import Header from "./components/Header";
import HomePage from "./containers/HomePage";
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

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
        setUserInfo(null);
      }
    });
    setLoading(false);
  }, []);

  const loginFn = (e) => {
    e.preventDefault();
    const email = e.currentTarget.loginEmail.value;
    const password = e.currentTarget.loginPassword.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log("LOGIN ERROR: ", error);
        setErrorMsg(error.message);
      });
  };

  const registerFn = (e) => {
    e.preventDefault();
    const username = e.currentTarget.username.value;
    const email = e.currentTarget.registerEmail.value;
    const password = e.currentTarget.registerPassword.value;
    const confirmPassword = e.currentTarget.registerConfirmPassword.value;

    if (password !== confirmPassword) {
      setErrorMsg("Wrong password!");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user?.updateProfile({
          displayName: username,
        });

        // Create new instance of user in firestore
        axios
          .get(
            `https://secure-fjord-04428.herokuapp.com/user/create?userId=${user.uid}`
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log("ACCOUNT CREATION FAILED: ", error);
        setErrorMsg(error.message);
      });
  };

  const signoutFn = () => {
    firebase
      .auth()
      .signOut()
      .catch((error) => {
        console.log("LOGOUT ERROR: ", error);
        setErrorMsg(error.message);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMsg("");
  };

  if (loading) return null;

  return (
    <div className="App">
      <Router>
        <Header userInfo={userInfo} loggedIn={loggedIn} signoutFn={signoutFn} />
        <Route exact path="/login">
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
            <LoginPage loginFn={loginFn} registerFn={registerFn} />
          )}
        </Route>
        <Route exact path="/">
          {loggedIn ? (
            <HomePage userInfo={userInfo} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Router>
      <Snackbar
        open={errorMsg !== ""}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
