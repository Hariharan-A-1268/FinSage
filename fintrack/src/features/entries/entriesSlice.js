import { createSlice } from "@reduxjs/toolkit";
import { formatDateISO } from "../../utils/helper";
const initialNewEntryState = {
  category: "",
  name: "",
  essential: "Yes",
  amount: "",
  date: formatDateISO(new Date()),
  description: "",
};
const initialState = {
  essential: "nofilter",
  category: "nofilter",
  filterModalOpen: false,
  newEntryModalOpen: false,
  newCategoryModalOpen: false,
  expenseInfoModalOpen: false,
  searchName: "",
  date: formatDateISO(new Date()),
  date1: "",
  date2: "",
  price1: 0,
  price2: 0,
  newEntry: initialNewEntryState,
  canEditEntry: false,
  canEditDescriptionModal: false,
};
const entriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {
    searchExpense(state, action) {
      state.searchName = action.payload;
    },
    filterByDate(state, action) {
      state.date = action.payload;
    },
    filterByEssential(state, action) {
      state.essential = action.payload;
    },
    filterByCategory(state, action) {
      state.category = action.payload;
    },

    updateEntry(state, action) {
      state.newEntry = action.payload;
    },
    filterByDateRangeMin(state, action) {
      state.date1 = action.payload;
    },
    filterByDateRangeMax(state, action) {
      state.date2 = action.payload;
    },
    filterByPriceRangeMin(state, action) {
      state.price1 = action.payload;
    },
    filterByPriceRangeMax(state, action) {
      state.price2 = action.payload;
    },
    openFilterModal(state, action) {
      state.filterModalOpen = action.payload;
    },
    openNewEntryModal(state, action) {
      state.newEntryModalOpen = action.payload;
    },
    openExpenseInfoModal(state, action) {
      state.expenseInfoModalOpen = action.payload;
    },
    updateCanEditEntry(state, action) {
      state.canEditEntry = action.payload;
    },
    updateCanEditDescriptionModal(state, action) {
      state.canEditDescriptionModal = action.payload;
    },
    resetNewEntryForm(state) {
      state.newEntry = initialNewEntryState;
    },
    reset(state) {
      state = initialState;
      return state;
    },
  },
});
export const {
  searchExpense,
  filterByDate,
  filterByEssential,
  filterByCategory,
  updateEntry,
  updateCanEditEntry,
  updateCanEditDescriptionModal,
  filterByDateRangeMin,
  filterByDateRangeMax,
  filterByPriceRangeMin,
  filterByPriceRangeMax,
  openFilterModal,
  openNewEntryModal,
  openExpenseInfoModal,
  resetNewEntryForm,
  reset,
} = entriesSlice.actions;
export default entriesSlice.reducer;
