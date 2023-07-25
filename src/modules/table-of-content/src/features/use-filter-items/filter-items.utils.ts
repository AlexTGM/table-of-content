import { Pages, TreeNode } from "../../entities";
import { getNodeId } from "../../shared";

export const filterData = (
  filterValue: string,
  rootNodes: TreeNode[],
  rawData: Pages
): TreeNode[] => {
  const getNodes = (result: TreeNode[], node: TreeNode): TreeNode[] => {
    const nodeId = getNodeId(node.path);

    const filterValueLowered = filterValue.toLowerCase();
    const nodeValueLowered = rawData[nodeId].title.toLowerCase();

    if (nodeValueLowered.includes(filterValueLowered)) {
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
