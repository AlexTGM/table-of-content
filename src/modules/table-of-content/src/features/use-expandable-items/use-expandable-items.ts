import { ExpandableItemsSlice, selectIsExpanded } from ".";
import { useCallback, useMemo } from "react";
import { selectNodeData } from "../../entities";
import { useAppDispatch, useAppSelector } from "../../shared";
import { createSelector } from "@reduxjs/toolkit";

const selectIsNodeExpandable = createSelector(
  selectNodeData,
  (nodeData) => (nodeData.pages?.length ?? 0) > 0
)

export const useExpandableItem = (nodeId: string) => {
  const dispatch = useAppDispatch();

  const isExpanded = useAppSelector((state) => selectIsExpanded(state, nodeId));
  const isExpandable = useAppSelector((state) => selectIsNodeExpandable(state, nodeId));

  const handleToggle = useCallback(() => {
    dispatch(ExpandableItemsSlice.actions.toggleItem(nodeId));
  }, [dispatch, nodeId]);

  return useMemo(
    () => ({
      isExpandable,
      isExpanded,
      handleToggle,
    }),
    [handleToggle, isExpandable, isExpanded]
  );
};
