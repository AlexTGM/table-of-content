import { ListItem } from ".";
import { renderWithProviders } from "../../../../../shared";

describe("List Item should", () => {
  it("render", () => {
    const node2 = { path: "2", children: [] };
    const node1 = { path: "1", children: [node2] };

    const { baseElement } = renderWithProviders(<ListItem itemPath="1" />, {
      preloadedState: {
        tree: {
          nodes: [node1, node2],
          rawData: {
            "1": {
              title: "Item #1",
              parentId: "ij",
              pages: ["2"],
              level: 0,
            },
            "2": {
              title: "Item #2",
              parentId: "2",
              level: 1,
            },
          },
        },
        expandedState: {
          expanded: {},
        },
      },
    });

    expect(baseElement).toHaveTextContent("Item #1");
    expect(baseElement).not.toHaveTextContent("Item #2");
  });
});
