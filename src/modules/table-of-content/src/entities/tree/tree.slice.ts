import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { TreeSliceState, TreeNode, Pages } from ".";

const initialState: TreeSliceState = {
  nodes: [],
  rawData: {},
};

export const TreeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    setRootNodes: (state, { payload }: PayloadAction<TreeNode[]>) => {
      state.nodes = payload;
    },
    setRawData: (state, { payload }: PayloadAction<Pages>) => {
      state.rawData = payload;
    },
  },
});

export const selectTreeState = (state: RootState) => state.tree;

export const selectRootNodes = createSelector(
  selectTreeState,
  (state) => state.nodes
);

export const selectRawData = createSelector(
  selectTreeState,
  (state) => state.rawData
);
