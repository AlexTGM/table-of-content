import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const SelectableItemSlice = createSlice({
  name: "selectedState",
  initialState: { path: "" },
  reducers: {
    setSelectedPath: (state, { payload }: PayloadAction<string>) => {
      state.path = payload;
    },
  },
});

export const selectSelectedItemPath = (state: RootState) =>
  state.selectedState.path;
