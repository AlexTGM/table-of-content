const node4 = { path: "4", children: [] };
const node3 = { path: "3", children: [] };
const node2 = { path: "2", children: [node3, node4] };
const node1 = { path: "1", children: [node2] };

export const preloadedState = {
  treeState: {
    nodes: [node1],
    rawData: {
      "1": {
        title: "Item #1",
        parentId: "ij",
        pages: ["2"],
        level: 0,
      },
      "2": {
        title: "Item #2",
        parentId: "1",
        pages: ["3"],
        level: 1,
      },
      "3": {
        title: "Item #1",
        parentId: "2",
        pages: [],
        level: 2,
      },
      "4": {
        title: "Subitem #4",
        parentId: "2",
        pages: [],
        level: 2,
      },
    },
  },
};
