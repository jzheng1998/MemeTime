import React from "react";

function LoginForm({ loginFn }) {
  return (
    <div>
      <form className="loginForm" onSubmit={(e) => loginFn(e)}>
        <label htmlFor="loginEmail">Email</label>
        <input type="email" name="loginEmail" />

        <label htmlFor="loginPassword">Password</label>
        <input type="password" name="loginPassword" />
      </form>
    </div>
  );
}

export default LoginForm;
