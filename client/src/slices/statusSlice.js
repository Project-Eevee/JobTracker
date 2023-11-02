import { createSlice } from '@reduxjs/toolkit';

export const jobItemsSlice = createSlice({
  name: 'jobItems',
  initialState: {
    items: [],
    statusFilter: '',
  },
  reducers: {
    setJobItems: (state, action) => {
      state.items = action.payload;
    },
    addJobItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeJobItem: (state, action) => {
      state.items = state.items.filter((item, index) => index !== action.payload);
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
  },
});

export const { setJobItems, addJobItem, removeJobItem, setStatusFilter } = jobItemsSlice.actions;

export const selectFilteredJobItems = (state) => {
  const { items, statusFilter } = state.jobItems;
  return statusFilter ? items.filter((item) => item.jobStatus === statusFilter) : items;
};

export default jobItemsSlice.reducer;
