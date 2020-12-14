import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import "../style/Header.css";
import { Redirect } from "react-router";

function Header({ userInfo, loggedIn, signoutFn }) {
  const redirectHome = () => {
    return <Redirect to="/" />;
  };

  return (
    <header className="headerContainer">
      <div className="appTitleContainer" onClick={redirectHome}>
        <h2 className="appTitle">MemeTime</h2>
      </div>

      {userInfo ? (
        <>
          <h1 className="centerText">
            {userInfo.displayName
              ? `Welcome, ${userInfo.displayName}!`
              : "Welcome!"}
          </h1>
          <div className="buttonContainer">
            <button className="signoutButton" onClick={() => signoutFn()}>
              <div className="signout">
                <h3 className="white signoutText">Exit</h3>
                <ExitToAppIcon className="white" />
              </div>
            </button>
          </div>
        </>
      ) : null}
    </header>
  );
}

export default Header;
