import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";

import "../style/LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

function RegisterForm({ registerFn }) {
  return (
    <div className="formContainer">
      <div className="formDescription">
        <div className="formText">
          <h3>Register</h3>
          <p style={{ marginBottom: 0 }}>Fill in the form below to sign up:</p>
        </div>
        <EditIcon style={{ fontSize: 64 }} className="formIcon" />
      </div>

      <form className="inputContainer" onSubmit={(e) => registerFn(e)}>
        <div className="form-floating mb-3">
          <input name="username" className="form-control" id="registerName" />
          <label htmlFor="registerName">Username</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            name="registerEmail"
            className="form-control"
            id="registerEmail"
          />
          <label htmlFor="registerEmail">Email</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            name="registerPassword"
            className="form-control"
            id="registerPassword"
          />
          <label htmlFor="registerPassword">Password</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            name="registerConfirmPassword"
            className="form-control"
            id="registerConfirmPassword"
          />
          <label htmlFor="registerConfirmPassword">Confirm Password</label>
        </div>

        <Button
          style={{ marginTop: 20 }}
          color="primary"
          variant="contained"
          disableElevation
          type="submit"
        >
          Sign me up!
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
