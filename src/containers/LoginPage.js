import React from "react";
import LoginForm from "../components/LoginForm";

function LoginPage({ loginFn, registerFn }) {
  return (
    <div className="loginContainer">
      <div>
        <LoginForm loginFn={loginFn} />
      </div>
      <div></div>
      <div></div>
    </div>
  );
}

export default LoginPage;
