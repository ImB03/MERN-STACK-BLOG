import React, { useState } from "react";
// import { GoogleLogin, googleLogout } from "@react-oauth/google";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./auth.css";
import {
  // ACTION_GG_AUTH,
  ACTION_SIGNIN,
  ACTION_SIGNUP,
} from "../../reducers/Slice/authSlice";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [infoUser, setInfoUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(ACTION_SIGNUP({ infoUser, setIsSignup }));
    } else {
      dispatch(ACTION_SIGNIN({ infoUser, navigate }));
    }
  };

  const handleChange = (e) => {
    setInfoUser({ ...infoUser, [e.target.name]: e.target.value });
  };

  const switchMode = (e) => {
    setIsSignup((preIsSignUp) => !preIsSignUp);
  };

  // const googleSuccess = async (res) => {
  //   const response = jwt_decode(res?.credential);
  //   const result = response;
  //   const token = response?.jti;
  //   // console.log(res);
  //   // console.log(result);
  //   // console.log(token);

  //   try {
  //     dispatch(ACTION_GG_AUTH({ result, token, navigate }));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const googleError = (e) => {
  //   console.log("Google Login Unsuccess");
  // };
  return (
    // <GoogleOAuthProvider clientId="704165309298-0us5tndt4om8is0gbi0iv3ej44u4ckbh.apps.googleusercontent.com">
      <div className="auth">
        <span className="authTitle">{isSignup ? "Sign Up" : "Sign In"}</span>
        <form className="authForm" onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <label>First Name:</label>
              <input
                name="firstName"
                className="authInput"
                type="text"
                placeholder="Enter your first name..."
                onChange={handleChange}
              />
              <label>Last Name:</label>
              <input
                name="lastName"
                className="authInput"
                type="text"
                placeholder="Enter your last name..."
                onChange={handleChange}
              />
            </>
          )}
          <label>Email:</label>
          <input
            name="email"
            className="authInput"
            type="email"
            placeholder="Enter your email..."
            onChange={handleChange}
          />
          <label>Password:</label>
          <input
            name="password"
            className="authInput"
            type="password"
            placeholder="Enter your password..."
            onChange={handleChange}
          />
          {isSignup && (
            <>
              <label>Confirm Password:</label>
              <input
                name="confirmPassword"
                className="authInput"
                type="password"
                placeholder="Enter your password..."
                onChange={handleChange}
              />
            </>
          )}
          <button className="authButton" type="submit">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
          {/* {!isSignup && (
            <GoogleLogin
              onSuccess={googleSuccess}
              onError={googleError}
              className="authGoogleButton"
              cookiePolicy="single_host_origin"
            />
          )} */}
          <div onClick={switchMode}>
            {isSignup
              ? "Already have an account? Sign In!"
              : "Don't have an account? Sign Up!"}
          </div>
        </form>
      </div>
    // </GoogleOAuthProvider>
  );
}
