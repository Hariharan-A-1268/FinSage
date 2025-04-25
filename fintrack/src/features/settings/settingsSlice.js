import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  canEditFullName: false,
  canEditEmail: false,
  canEditPassword: false,
  email: "",
  password: "",
  fullName: "",
  passwordVisibility: "password",
};
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    editEmail(state, action) {
      state.canEditEmail = action.payload;
    },
    editPassword(state, action) {
      state.canEditPassword = action.payload;
    },
    editFullName(state, action) {
      state.canEditFullName = action.payload;
    },
    updateFullName(state, action) {
      state.fullName = action.payload;
    },
    updateEmail(state, action) {
      state.email = action.payload;
    },
    updatePassword(state, action) {
      state.password = action.payload;
    },
    updatePassWordVisiblity(state, action) {
      state.passwordVisibility = action.payload;
    },
    reset(state) {
      state = initialState;
      return state;
    },
  },
});
export const {
  updateAvatar,
  editEmail,
  editPassword,
  editFullName,
  reset,
  updatePassWordVisiblity,
  updateEmail,
  updatePassword,
  updateFullName,
} = settingsSlice.actions;
export default settingsSlice.reducer;
