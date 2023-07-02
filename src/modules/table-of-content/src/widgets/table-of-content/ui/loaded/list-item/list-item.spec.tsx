import { fireEvent } from "@testing-library/react";
import { ListItem } from ".";
import { renderWithProviders } from "../../../../../shared";

describe("List Item should", () => {
  it("render", () => {
    const node2 = { path: "2", children: [] };
    const node1 = { path: "1", children: [node2] };

    const { baseElement, getByTestId } = renderWithProviders(<ListItem itemPath="1" />, {
      preloadedState: {
        treeState: {
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
      },
    });

    expect(baseElement).toHaveTextContent("Item #1");

    fireEvent.click(getByTestId('list-item-1'));
  });

  it('have indentation', () => {
    const node2 = { path: "2", children: [] };

    const { getByTestId } = renderWithProviders(<ListItem itemPath="2" />, {
      preloadedState: {
        treeState: {
          nodes: [node2],
          rawData: {
            "2": {
              title: "Item #2",
              parentId: "2",
              level: 1,
            },
          },
        },
      },
    });

    expect(getByTestId("div-item-2")).toHaveStyle('padding-left: 32px');
  })
});
