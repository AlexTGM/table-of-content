import { useMemo } from "react";
import { TreeNode } from "../../../../entities";
import { selectExpandedState } from "../../../../features";
import { useAppSelector, getNodeId } from "../../../../shared";

export const useListItems = (rootNodes: TreeNode[]): string[] => {
  const expandedState = useAppSelector(selectExpandedState);

  return useMemo(() => {
    const addNodes = (nodes: string[], currentNode: TreeNode): string[] => {
      nodes.push(currentNode.path);

      if (
        currentNode.children.length > 0 &&
        expandedState[getNodeId(currentNode.path)]
      ) {
        nodes = nodes.concat(currentNode.children.reduce(addNodes, []));
      }

      return nodes;
    };

    return rootNodes.reduce(addNodes, []);
  }, [expandedState, rootNodes]);
};
