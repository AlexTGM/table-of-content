import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

export const FilterItemsSlice = createSlice({
  name: "filterState",
  initialState: {
    filterValue: "",
  },
  reducers: {
    setFilterValue: (state, { payload }: PayloadAction<string>) => {
      state.filterValue = payload;
    },
  },
});

export const selectFilterState = (state: RootState) => state.filterState;

export const selectFilterValue = createSelector(
  selectFilterState,
  (state) => state.filterValue
);
