import { createSlice } from "@reduxjs/toolkit";

export const TableOfContentSlice = createSlice({
  name: "tableOfContent",
  initialState: {
    value: 1,
  },
  reducers: {
    increaseValue: (state) => {
      state.value += 1;
    },
    decreaseValue: (state) => {
      state.value -= 1;
    },
  },
});

export const selectValue = (state: RootState) => state.tableOfContent.value;
