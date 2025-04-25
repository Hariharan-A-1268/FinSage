import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loginUserName: "",
  loginPassword: "",
  signupUserName: "",
  signupUserPassword: "",
  signupConfirmPassword: "",
  isSignup: false,
  resetEmail: "",
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateLoginUserName(state, action) {
      state.loginUserName = action.payload;
    },
    updateLoginPassword(state, action) {
      state.loginPassword = action.payload;
    },
    updateSignupUserName(state, action) {
      state.signupUserName = action.payload;
    },
    updateSignupPassword(state, action) {
      state.signupUserPassword = action.payload;
    },
    updateSignupConfirmPassword(state, action) {
      state.signupConfirmPassword = action.payload;
    },
    updateIsSignup(state, action) {
      state.isSignup = action.payload;
    },
    updateResetEmail(state, action) {
      state.resetEmail = action.payload;
    },
    reset(state) {
      state = initialState;
      return state;
    },
  },
});
export const {
  updateLoginUserName,
  updateLoginPassword,
  updateSignupUserName,
  updateSignupPassword,
  updateSignupConfirmPassword,
  updateIsSignup,
  updateResetEmail,
} = loginSlice.actions;
export default loginSlice.reducer;
