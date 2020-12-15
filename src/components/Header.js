import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";

import "../style/Header.css";

function Header({ userInfo, loggedIn, signoutFn }) {
  const history = useHistory();

  const redirectHome = () => {
    history.push("/");
  };

  return (
    <header className="headerContainer">
      <div className="appTitleContainer">
        <div onClick={redirectHome}>
          <h2 className="appTitle">MemeTime</h2>
        </div>
      </div>

      {userInfo ? (
        <>
          <h1 className="centerText">
            {userInfo.displayName
              ? `Welcome, ${userInfo.displayName}!`
              : "Welcome!"}
          </h1>
          <div className="buttonContainer">
            <div onClick={() => signoutFn()}>
              <ExitToAppIcon style={{ fontSize: 40 }} className="signout" />
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}

export default Header;
