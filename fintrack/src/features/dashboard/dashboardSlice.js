import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboardDate: "",
  dashboardDate1: "",
  dashboardDate2: "",
  lineGraphView: "daily",
};
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateDashBoardDate(state, action) {
      state.dashboardDate = action.payload;
    },
    updateDashBoardDate1(state, action) {
      state.dashboardDate1 = action.payload;
    },
    updateDashBoardDate2(state, action) {
      state.dashboardDate2 = action.payload;
    },
    updateLineGraphView(state, action) {
      state.lineGraphView = action.payload;
    },
    resetDashboardDateRange(state) {
      state.dashboardDate1 = "";
      state.dashboardDate2 = "";
    },
    resetDashboard(state) {
      state = initialState;
      return state;
    },
  },
});
export const {
  updateDashBoardDate,
  updateDashBoardDate1,
  updateDashBoardDate2,
  updateLineGraphView,
  resetDashboardDateRange,
  resetDashboard,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
