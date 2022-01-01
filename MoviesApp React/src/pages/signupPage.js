import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";

const LoginPage = props => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  //const [fullName, setFullName] = useState("");

  const signup = () => {
    if(passwordAgain === password){
      if(context.register(userName, password)){
        context.authenticate(userName, password);
      }
    }
  };

  // Set 'from' to path where browser is redirected after a successful login.
  // Either / or the protected path user tried to access.
  const { from } = props.location.state || { from: { pathname: "/" } };

  if (context.isAuthenticated === true) {
    return <Redirect to={from} />;
  }
  return (
    <>
      <h2>Create A New Account</h2>
      <input id="username" placeholder="user name" onChange={e => {
        setUserName(e.target.value);
      }}></input><br />
      <input id="password" type="password" placeholder="password" onChange={e => {
        setPassword(e.target.value);
      }}></input><br />
      <input id="passwordAgain" type="password" placeholder="repeat password" onChange={e => {
        setPasswordAgain(e.target.value);
      }}></input><br />
      <button onClick={signup}>Sign Up</button>
    </>
  );
};

export default LoginPage;