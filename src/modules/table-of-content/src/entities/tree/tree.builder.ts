import { BuildTree, TreeNode } from ".";
import { concatPath, getNodeId } from "../../shared";

const createTreeNode = (path: string): TreeNode => ({ path, children: [] })

export const buildTree: BuildTree = ({ topLevelIds, getChildren }) => {
  const rootNode = createTreeNode('ROOT');

  rootNode.children = [...topLevelIds.map(createTreeNode)];

  const fill = (node: TreeNode) => {
    const nodeId = getNodeId(node.path);
    const children = getChildren(nodeId);

    if (children && children.length > 0) {
      node.children = [...children.map((childId) => createTreeNode(concatPath(node.path, childId)))]

      node.children.forEach(fill)
    }
  }

  rootNode.children.forEach(fill)

  return rootNode.children;
}