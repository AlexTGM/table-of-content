import { SelectableItemsSlice, selectSelectedItemPath } from ".";
import { useMemo, useCallback } from "react";
import { HighlightType, getPathNodes, useAppDispatch, useAppSelector } from "../../shared";
import { createSelector } from "@reduxjs/toolkit";

const selectPathHighlight = createSelector(
  [selectSelectedItemPath, (_, nodePath: string) => nodePath],
  (selectedItem, nodePath) => {
    const nodes = getPathNodes(selectedItem ?? "");

    const ancestorId = nodes[0];
    const parentId = nodes[nodes.length - 2];
    const activeId = nodes[nodes.length - 1];

    if (activeId && nodePath.includes(activeId)) return "active";
    if (ancestorId !== parentId && nodePath.includes(parentId)) return "parent";
    if (ancestorId && nodePath.includes(ancestorId)) return "ancestor";

    return "none";
  }
);

type UseSelectableItems = (path: string) => {
  highlightType: HighlightType,
  handleSelect: () => void
};

export const useSelectableItems: UseSelectableItems = (path) => {
  const dispatch = useAppDispatch();

  const highlightType = useAppSelector((state) => selectPathHighlight(state, path));

  const handleSelect = useCallback(() => {
    dispatch(SelectableItemsSlice.actions.setSelectedPath(path));
  }, [dispatch, path]);

  return useMemo(() => ({ highlightType, handleSelect }), [handleSelect, highlightType]);
};
