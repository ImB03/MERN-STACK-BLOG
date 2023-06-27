import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authData: null,
    isLoading: false,
  },
  reducers: {
    // ACTION_GG_AUTH: (state, action) => {
    //   localStorage.setItem("profile", JSON.stringify(action.payload));

    //   // state.authData = action.payload;
    //   action.payload.navigate("/");
    // },
    ACTION_LOGOUT: (state, action) => {
      localStorage.clear();

      state.authData = null;
    },
    ACTION_SIGNUP: (state, action) => {},
    ACTION_SIGNIN: (state, action) => {},
    // GG_AUTH: (state, action) => {
    // localStorage.setItem("profile", JSON.stringify(action.payload.result));

    // action.payload.navigate("/");
    // },
    SIGNUP: (state, action) => {
      // localStorage.setItem(
      //   "profile",
      //   JSON.stringify({ ...action.payload.infoUser })
      // );

      // state.authData = { ...action.payload };

      action.payload.setIsSignup((preIsSignUp) => !preIsSignUp);
    },
    SIGNIN: (state, action) => {
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...action.payload.result })
      );

      state.authData = action.payload.result;

      action.payload.navigate("/");
    },
  },
});

export const {
  // ACTION_GG_AUTH,
  ACTION_SIGNUP,
  ACTION_SIGNIN,
  ACTION_LOGOUT,
  // GG_AUTH,
  SIGNUP,
  SIGNIN,
} = authSlice.actions;

export default authSlice.reducer;
