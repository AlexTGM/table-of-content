import { fireEvent } from "@testing-library/react";
import { ListItem } from ".";
import { renderWithProviders } from "../../../../../shared";
import "jest-styled-components";

const node2 = { path: "2", children: [] };
const node1 = { path: "1", children: [node2] };

const preloadedState = {
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
};

describe("List Item should", () => {
  it("render", () => {
    const { baseElement, getByTestId } = renderWithProviders(
      <ListItem itemPath="1" />,
      {
        preloadedState,
      }
    );

    expect(baseElement).toHaveTextContent("Item #1");

    fireEvent.click(getByTestId("list-item-1"));

    expect(getByTestId("div-item-1")).not.toHaveStyleRule(
      "background-color",
      "#307FFF"
    );
  });

  it("have indentation", () => {
    const { getByTestId } = renderWithProviders(<ListItem itemPath="2" />, {
      preloadedState,
    });

    expect(getByTestId("div-item-2")).toHaveStyleRule(
      "padding",
      "8px 0 8px 32px"
    );
  });

  it("highlight on selection", () => {
    const { getByTestId } = renderWithProviders(<ListItem itemPath="2" />, {
      preloadedState,
    });

    fireEvent.click(getByTestId("div-item-2"));

    expect(getByTestId("div-item-2")).toHaveStyleRule(
      "background-color",
      "#307FFF"
    );
  });
});
