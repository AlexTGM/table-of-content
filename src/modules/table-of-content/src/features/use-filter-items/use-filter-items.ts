import { createSelector } from "@reduxjs/toolkit";
import {
  Pages,
  TreeNode,
  selectRawData,
  selectRootNodes,
} from "../../entities";
import { getNodeId, useAppSelector } from "../../shared";
import { selectFilterValue } from "./filter-items.slice";

export const filter = (
  rawData: Pages,
  rootNodes: TreeNode[],
  filterValue: string
) => {
  const getNodes = (result: TreeNode[], node: TreeNode): TreeNode[] => {
    const nodeId = getNodeId(node.path);

    if (rawData[nodeId].title.includes(filterValue)) {
      result.push(node);
      return result;
    }

    if (Array.isArray(node.children)) {
      const children = node.children.reduce(getNodes, []);
      if (children.length) result.push({ ...node, children });
    }

    return result;
  };

  return filterValue === "" ? rootNodes : rootNodes.reduce(getNodes, []);
};

export const selectFiltered = createSelector(
  [selectRawData, selectRootNodes, selectFilterValue],
  filter
);

export const useFilterItems = () => useAppSelector(selectFiltered);
