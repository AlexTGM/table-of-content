import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { getPathNodes } from "../../shared";

export const ExpandableItemsSlice = createSlice({
  name: "expandedState",
  initialState: { expanded: { ROOT: true } } as {
    expanded: Record<string, boolean>;
  },
  reducers: {
    toggleItem: (state, { payload }: PayloadAction<string>) => {
      state.expanded[payload] = !state.expanded[payload] ?? true;
    },
    expandToPath: (state, { payload }: PayloadAction<string>) => {
      const nodes = getPathNodes(payload);

      nodes.forEach((node) => {
        state.expanded[node] = true;
      });
    },
  },
});

export const selectExpandedState = (state: RootState) =>
  state.expandedState.expanded;

export const selectIsExpanded = createSelector(
  [selectExpandedState, (_, nodeId: string) => nodeId],
  (expanded, nodeId) => expanded[nodeId]
);
