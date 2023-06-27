import { call, put, takeEvery } from "redux-saga/effects";

import {
  ACTION_SIGNUP,
  ACTION_SIGNIN,
  SIGNUP,
  SIGNIN,
} from "../Slice/authSlice";
import { signUp, signIn } from "../../api";

// SIGN UP
function* SignUp(action) {
  try {
    const infoUser = yield call(() => signUp(action.payload.infoUser));
    yield put(
      SIGNUP({ result: infoUser.data, setIsSignup: action.payload.setIsSignup })
    );
  } catch (error) {
    console.log(error);
  }
}

// SIGN IN
function* SignIn(action) {
  try {
    const infoUser = yield call(() => signIn(action.payload.infoUser));
    yield put(
      SIGNIN({ result: infoUser.data, navigate: action.payload.navigate })
    );
  } catch (error) {
    console.log(error);
  }
}

function* AuthSaga() {
  yield takeEvery(ACTION_SIGNUP, SignUp);
  yield takeEvery(ACTION_SIGNIN, SignIn);
}

export default AuthSaga;
