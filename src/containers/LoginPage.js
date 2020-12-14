import React from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

import "../style/LoginPage.css";

function LoginPage({ loginFn, registerFn }) {
  return (
    <div className="pageContainer">
      <LoginForm loginFn={loginFn} />
      <div className="separator"></div>
      <RegisterForm registerFn={registerFn} />
    </div>
  );
}

export default LoginPage;
