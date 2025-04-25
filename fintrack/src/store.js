import { configureStore } from "@reduxjs/toolkit";
import entriesReducer from "./features/entries/entriesSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import settingsReducer from "./features/settings/settingsSlice";
import loginReducer from "./features/login/loginSlice";
const store = configureStore({
  reducer: {
    login: loginReducer,
    entries: entriesReducer,
    dashboard: dashboardReducer,
    settings: settingsReducer,
  },
});
export default store;
