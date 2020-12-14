import React from "react";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { Button } from "@material-ui/core";

import "../style/LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginForm({ loginFn }) {
  return (
    <div className="formContainer">
      <div className="formDescription">
        <div className="formText">
          <h3>Login</h3>
          <p style={{ marginBottom: 0 }}>Enter email and password to log in:</p>
        </div>
        <VpnKeyIcon style={{ fontSize: 64 }} className="formIcon" />
      </div>

      <form className="inputContainer" onSubmit={(e) => loginFn(e)}>
        <div className="form-floating mb-3">
          <input
            type="email"
            name="loginEmail"
            className="form-control"
            id="loginEmail"
          />
          <label htmlFor="loginEmail">Email</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            name="loginPassword"
            className="form-control"
            id="loginPassword"
          />
          <label htmlFor="loginPassword">Password</label>
        </div>

        <Button
          style={{ marginTop: 20 }}
          color="primary"
          variant="contained"
          disableElevation
          type="submit"
        >
          Sign in!
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
