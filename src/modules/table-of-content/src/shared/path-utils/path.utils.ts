export const delimiter = "//";

export const getPathNodes = (path: string) => {
  return path.split(delimiter);
};

export const getFirstNodeId = (path: string) => {
  const pathNodes = getPathNodes(path);

  return pathNodes[0];
};

export const getParentNodeId = (path: string): string | undefined => {
  const pathNodes = getPathNodes(path);

  return pathNodes[pathNodes.length - 2];
};

export const getNodeId = (path: string) => {
  const pathNodes = getPathNodes(path);

  return pathNodes[pathNodes.length - 1];
};

export const joinPath = (nodes: string[]) => {
  return nodes.join(delimiter);
};

export const concatPath = (path1: string, path2: string) => {
  return `${path1}${delimiter}${path2}`;
};
