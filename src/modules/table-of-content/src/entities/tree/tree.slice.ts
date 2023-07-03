import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { TreeSliceState, TreeNode, Pages } from ".";

const initialState: TreeSliceState = {
  nodes: [],
  rawData: {},
};

export const TreeSlice = createSlice({
  name: "treeState",
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

export const selectTreeState = (state: RootState) => state.treeState;

export const selectRootNodes = createSelector(
  selectTreeState,
  (state) => state.nodes
);

export const selectRawData = createSelector(
  selectTreeState,
  (state) => state.rawData
);

export const selectNodeData = createSelector(
  [selectRawData, (_, nodeId: string) => nodeId],
  (data, nodeId) => data[nodeId]
);
