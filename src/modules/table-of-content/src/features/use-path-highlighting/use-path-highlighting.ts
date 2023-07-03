import { HighlightType, getPathNodes, useAppSelector } from "../../shared";
import { selectSelectedItemPath } from "..";
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

export const usePathHighlighting = (nodePath: string): HighlightType =>
  useAppSelector((state) => selectPathHighlight(state, nodePath));
