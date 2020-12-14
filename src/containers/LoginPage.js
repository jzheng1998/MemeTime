import React from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function LoginPage({ loginFn, registerFn }) {
  return (
    <div className="pageContainer">
      <LoginForm loginFn={loginFn} />
      <RegisterForm registerFn={registerFn} />
    </div>
  );
}

export default LoginPage;
