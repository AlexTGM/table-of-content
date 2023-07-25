import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { TreeNode } from "../../entities";

type FilterItemsState = {
  filterValue: string;
  filteredNodes: TreeNode[];
};

const initialState: FilterItemsState = {
  filterValue: "",
  filteredNodes: [],
};

export const FilterItemsSlice = createSlice({
  name: "filterState",
  initialState,
  reducers: {
    setFilterValue: (state, { payload }: PayloadAction<string>) => {
      state.filterValue = payload;
    },
    setFilteredValues: (state, { payload }: PayloadAction<TreeNode[]>) => {
      state.filteredNodes = payload;
    },
  },
});

export const selectFilterState = (state: RootState) => state.filterState;

export const selectFilterValue = createSelector(
  selectFilterState,
  (state) => state.filterValue
);

export const selectFilteredNodes = createSelector(
  selectFilterState,
  (state) => state.filteredNodes
);
