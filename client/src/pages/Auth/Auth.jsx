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
      <div className="container">
        <div className="row d-flex flex-column justify-content-center align-items-center pt-5">
          <div className="col d-flex justify-content-center align-items-center">
            <span className="authTitle">
              {isSignup ? "Sign Up" : "Sign In"}
            </span>
          </div>
          <div className="col d-flex justify-content-center align-items-center">
            <form className="authForm" onSubmit={handleSubmit}>
              <div className="container">
                <div className="row mt-4 d-flex flex-column justify-content-center align-items-center">
                  {isSignup && (
                    <div className="col mt-2 mb-2 d-flex justify-content-center align-items-center">
                      <input
                        name="firstName"
                        className="authInput p-3 me-2"
                        type="text"
                        placeholder="Enter your first name..."
                        onChange={handleChange}
                      />
                      <input
                        name="lastName"
                        className="authInput p-3 ms-2"
                        type="text"
                        placeholder="Enter your last name..."
                        onChange={handleChange}
                      />
                    </div>
                  )}
                  <div className="col mt-2 mb-2  d-flex justify-content-center align-items-center">
                    <input
                      name="email"
                      className="authInput p-3"
                      type="email"
                      placeholder="Enter your email..."
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col mt-2 mb-2  d-flex justify-content-center align-items-center">
                    <input
                      name="password"
                      className="authInput p-3"
                      type="password"
                      placeholder="Enter your password..."
                      onChange={handleChange}
                    />
                  </div>
                  {isSignup && (
                    <div className="col mt-2 mb-2  d-flex justify-content-center align-items-center">
                      <input
                        name="confirmPassword"
                        className="authInput p-3"
                        type="password"
                        placeholder="Enter your password..."
                        onChange={handleChange}
                      />
                    </div>
                  )}
                  <div className="col mt-2 d-flex justify-content-center align-items-center">
                    <button className="authButton pt-2 pb-2" type="submit">
                      {isSignup ? "Sign Up" : "Sign In"}
                    </button>
                  </div>
                  {/* {!isSignup && (
                      <GoogleLogin
                        onSuccess={googleSuccess}
                        onError={googleError}
                        className="authGoogleButton"
                        cookiePolicy="single_host_origin"
                      />
                    )} */}
                  <div className="col mt-3 d-flex justify-content-center align-items-center">
                    <div onClick={switchMode} className="text-center">
                      {isSignup
                        ? "Already have an account? Sign In!"
                        : "Don't have an account? Sign Up!"}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    // </GoogleOAuthProvider>
  );
}
